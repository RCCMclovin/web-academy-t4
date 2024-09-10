function createLink(path, filename) {
    return `<a href="${path}${filename}">${filename}</a><br>\n`;
}
   
module.exports = {
    createLink: createLink
}