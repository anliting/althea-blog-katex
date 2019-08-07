function Plugin(althea){
    althea.setClientModules({
        blog_page:'blog_page.js'
    })
}
Plugin.prototype.end=function(){
}
Plugin.prototype.shutdownEnd=function(){
}
export default Plugin
