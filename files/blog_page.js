import{doe}from'/lib/core.static.js'
let loaded
async function load(){
    let
        root='https://cdn.jsdelivr.net/npm/katex@0.10.0/dist',
        styleSheetUrl=`${root}/katex.min.css`,
        scriptUrl=`${root}/katex.min.js`
    doe.head(
        doe.link({
            rel:'stylesheet',
            href:styleSheetUrl,
        })
    )
    await new Promise(rs=>
        doe.body(
            doe.script({
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
            let option={}
            if(s.dataset.option=='displayMode')
                option.displayMode=true
            katex.render(decodeURIComponent(s.textContent),n,option)
        }catch(e){
            n.title=e
            n.style.fontFamily='monospace'
            n.textContent=s.textContent
        }
        p.replaceChild(n,s)
    })
}
export default plugin
