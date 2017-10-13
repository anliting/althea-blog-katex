;(async()=>{
    let core=await module.module('/lib/core.static.js')
    let{dom}=core
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
    await load()
    this.addPagePlugin(div=>{
        ;[...div.getElementsByTagName('script')].filter(
            s=>s.type=='althea-katex'
        ).forEach(s=>{
            let
                n=document.createElement('span'),
                p=s.parentNode
            try{
                katex.render(s.textContent,n)
            }catch(e){
                n.title=e
                n.style.fontFamily='monospace'
                n.textContent=s.textContent
            }
            p.insertBefore(n,s)
            p.removeChild(s)
        })
    })
})()
