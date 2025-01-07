import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import altair as alt
import plotly.express as px
from streamlit_searchbox import st_searchbox

def make_choropleth(input_df, input_id, input_column, input_color_theme):
choropleth = px.choropleth(input_df, locations=input_id, color=input_column, locationmode="USA-states",
 color_continuous_scale=input_color_theme,
 range_color=(min(input_df[input_column]), max(input_df[input_column])),
 scope="usa",
 labels={input_column:input_column}
)
choropleth.update_layout(
template='plotly_dark',
plot_bgcolor='rgba(0, 0, 0, 0)',
paper_bgcolor='rgba(0, 0, 0, 0)',
margin=dict(l=0, r=0, t=0, b=0),
height=350
)
return choropleth

def search(search_term):
global df
global selected_state
if search_term:
if selected_state == "Entire Country":
return df.query(f"City.str.match('{search_term}', case=False)", engine='python')["City"].tolist()[::-1]
else:
return df[df["State"] == selected_state].query(f"City.str.match('{search_term}', case=False)", engine='python')["City"].tolist()[::-1]

st.set_page_config(
page_title="Dashboard Weather in the US",
page_icon="🏂",
layout="wide",
initial_sidebar_state="expanded")

alt.themes.enable("dark")

global df
df = pd.read_csv('weather_data.csv')
df_by_state = df.groupby('State').agg({'State Code':'max','id':'max','Temperature': 'mean', 'Humidity': 'mean', 'Wind Speed': 'mean'}).reset_index()

with st.sidebar:
st.title('🏂 Dashboard Weather in the US')

columns = list(df.columns)[6::][::-1]
selected_column = st.selectbox('Select a parameter', columns, index=len(columns)-1)

global selected_state
selected_state = st.selectbox('Select a state', list(df_by_state['State']) + ["Entire Country"], index=len(df_by_state['State']))

selected_city = st_searchbox(
search,
placeholder= "Search for a city",
key="my_key",
)

color_theme_list = ['viridis', 'blues', 'cividis', 'greens', 'inferno', 'magma', 'plasma', 'reds', 'rainbow', 'turbo']
selected_color_theme = st.selectbox('Select a theme', color_theme_list)




col = st.columns((1.5, 4.5, 2.5), gap='medium')

with col[0]:
st.markdown(f'#### Mean {selected_column} in {selected_state}')

label = selected_column
if selected_column == "Temperature":
label += " (°C)"
elif selected_column == "Humidity":
label += " (%)"
elif selected_column == "Wind Speed":
label += " (m/s)"

if selected_state == "Entire Country":
value = (int(df_by_state[selected_column].mean()*100)/100)
st.metric(label=label, value=value)
else:
value = (int(df_by_state[df_by_state['State'] == selected_state][selected_column]*100)/100)
country_average = (int(df_by_state[selected_column].mean()*100)/100)
st.metric(label=label, value=value, delta=(int((value-country_average)*100)/100))

if selected_city and len(df[(df["City"] == selected_city) & (df['State'] == selected_state)]) > 0:
st.markdown(f'#### {selected_column} in {selected_city}')

label2 = selected_column
if selected_column == "Temperature":
label2 += " (°C)"
elif selected_column == "Humidity":
label2 += " (%)"
elif selected_column == "Wind Speed":
label2 += " (m/s)"

if selected_state == "Entire Country":
mean = (int(df_by_state[selected_column].mean()*100)/100)
value = df[df["City"] == selected_city][selected_column].iloc[0]
else:
mean = (int(df_by_state[df_by_state['State'] == selected_state][selected_column]*100)/100)
value = df[(df["City"] == selected_city) & (df['State'] == selected_state)][selected_column].iloc[0]
st.metric(label=label, value=value, delta=(int((value-mean)*100)/100))
else:
selected_city = None
with st.expander('Info:', expanded=False):
st.write('''
- The delta is calculated based on the average of the entire country for the state mean, and the state mean for one city.
''')
 

with col[1]:
if selected_state == "Entire Country":
st.markdown(f'#### {selected_column} by State')

choropleth = make_choropleth(df_by_state, 'State Code', selected_column, selected_color_theme)
st.plotly_chart(choropleth, use_container_width=True)

st.markdown(f'#### {selected_column} in the US')
fig, ax = plt.subplots( figsize=(5, 1), facecolor=(0,0,0,0), edgecolor=(0,0,0,0))
ax.boxplot(df_by_state[selected_column],vert=False)
ax.spines['top'].set_color((0,0,0,0))
ax.spines['left'].set_color((0,0,0,0))
ax.spines['right'].set_color((0,0,0,0))
ax.spines['bottom'].set_color('w')
ax.tick_params(axis='x', colors='w')
ax.tick_params(axis='y', colors=(0,0,0,0))
st.pyplot(fig)
else:
st.markdown(f'#### {selected_column} by State')

choropleth = make_choropleth(df_by_state[df_by_state["State"] == selected_state], 'State Code', selected_column, selected_color_theme)
st.plotly_chart(choropleth, use_container_width=True)

st.markdown(f'#### {selected_column} in {selected_state}')
fig, ax = plt.subplots( figsize=(5, 1), facecolor=(0,0,0,0), edgecolor=(0,0,0,0))
ax.boxplot(df[df["State"] == selected_state][selected_column],vert=False)
ax.spines['top'].set_color((0,0,0,0))
ax.spines['left'].set_color((0,0,0,0))
ax.spines['right'].set_color((0,0,0,0))
ax.spines['bottom'].set_color('w')
ax.tick_params(axis='x', colors='w')
ax.tick_params(axis='y', colors=(0,0,0,0))
st.pyplot(fig)

with col[2]:
if selected_state == "Entire Country":
st.markdown('#### Weather by State Capital')

st.dataframe(df[df["Is Capital"] == True].sort_values(by="City"),
column_order=("City", "Weather"),
hide_index=True,
width=None,
column_config={
"City": st.column_config.TextColumn(
"City",
),
"Weather": st.column_config.TextColumn(
"Weather",
)}
)
else:
st.markdown('#### Weather by City')

st.dataframe(df[df["State"] == selected_state].sort_values(by="City"),
column_order=("City", "Weather"),
hide_index=True,
width=None,
column_config={
"City": st.column_config.TextColumn(
"City",
),
"Weather": st.column_config.TextColumn(
"Weather",
)}
)
with st.expander('About', expanded=True):
st.write('''
- Data: Open Weather API (https://openweathermap.org/). 
- The data was collected between 04/01/2025 and 05/01/2015.
''')
