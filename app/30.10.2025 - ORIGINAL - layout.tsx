import '../styles/globals.css'
import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/WhatsAppButton' // ✅ Import the WhatsApp button

export const metadata: Metadata = {
  title: 'Rishab Informatica Group',
  description: 'Advanced Your Tech Career With Expert Training',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white">
        <Header />
        <main className="pt-0">
          {children}
        </main>
        <Footer />
        <WhatsAppButton /> {/* ✅ WhatsApp floating button added */}

        {/* ✅ Chatbase Chatbot Embed */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if(!window.chatbase || window.chatbase("getState") !== "initialized"){
                  window.chatbase=(...arguments)=>{ 
                    if(!window.chatbase.q){window.chatbase.q=[]}
                    window.chatbase.q.push(arguments)
                  };
                  window.chatbase=new Proxy(window.chatbase,{
                    get(target,prop){
                      if(prop==="q"){return target.q}
                      return(...args)=>target(prop,...args)
                    }
                  })
                }
                const onLoad=function(){
                  const script=document.createElement("script");
                  script.src="https://www.chatbase.co/embed.min.js";
                  script.id="JmObNdpuxmTB2kL1Pjy_2"; // Replace with your actual chatbot ID if needed
                  script.domain="www.chatbase.co";
                  document.body.appendChild(script)
                };
                if(document.readyState==="complete"){onLoad()}
                else{window.addEventListener("load",onLoad)}
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
