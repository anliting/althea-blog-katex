import{dom}from'/lib/core.static.js'
let loaded
async function load(){
    let
        root='https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3',
        styleSheetUrl=`${root}/katex.min.css`,
        scriptUrl=`${root}/katex.min.js`
    dom.head(
        dom.link({
            rel:'stylesheet',
            href:styleSheetUrl,
        })
    )
    await new Promise(rs=>
        dom.body(
            dom.script({
                src:scriptUrl,
                onload(){
                    document.body.removeChild(this)
                    rs()
                },
            })
        )
    )
}
function cachedLoad(){
    if(!loaded)
        loaded=load()
    return loaded
}
async function plugin(div){
    let scripts=[...div.getElementsByTagName('script')].filter(
        s=>s.type=='althea-katex'
    )
    if(scripts.length==0)
        return
    await cachedLoad()
    scripts.forEach(s=>{
        let
            n=document.createElement('span'),
            p=s.parentNode
        try{
            katex.render(decodeURIComponent(s.textContent),n)
        }catch(e){
            n.title=e
            n.style.fontFamily='monospace'
            n.textContent=s.textContent
        }
        p.replaceChild(n,s)
    })
}
export default plugin
