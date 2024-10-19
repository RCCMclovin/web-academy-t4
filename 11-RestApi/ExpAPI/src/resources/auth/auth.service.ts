const users = [
    { id: 1, email: "user@user.com", password: "senha123" },
    {id:2, email: "u2@u2.com", password:"senha123"},
]

export const checkAuth = (email: string, password: string): number | null => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) return user.id;
    return null;
}

