import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Heart, Menu, Minus, PackageCheck, Plus, Search, ShieldCheck, ShoppingBag, Star, Truck, X } from 'lucide-react';
import './styles.css';

const copy = {
  fr: {
    nav:['Nouveautés','Homme','Femme','Collections'], search:'Rechercher', account:'Compte', heroTag:'L’élégance, à chaque seconde', heroTitle:<>Le temps vous<br/><em>appartient.</em></>, heroText:'Des montres de caractère, sélectionnées pour celles et ceux qui savent que chaque détail compte.', shop:'Découvrir la collection', story:'Notre histoire', new:'NOUVELLE COLLECTION', curated:'Sélection du moment', curatedSub:'Des pièces intemporelles, pensées pour sublimer chaque instant.', all:'Tout voir', add:'Ajouter au panier', added:'Ajouté', promise:'La promesse Maison Temps', promiseText:'Une exigence absolue, du premier regard jusqu’à votre poignet.', delivery:'Livraison offerte', deliverySub:'Partout au Maroc dès 500 MAD', secure:'Paiement sécurisé', secureSub:'À la livraison ou par carte', quality:'Qualité garantie', qualitySub:'Chaque pièce vérifiée avec soin', support:'Service attentionné', supportSub:'Disponible 7j/7 sur WhatsApp', quote:'“Une montre ne donne pas seulement l’heure. Elle raconte la façon dont vous choisissez de la vivre.”', journal:'Le Journal', journalTitle:'L’art de choisir sa montre', journalText:'Taille du boîtier, mouvement, bracelet… Découvrez notre guide pour trouver la montre qui vous ressemble vraiment.', read:'Lire le guide', newsletter:'Entrez dans le cercle', newsletterText:'Avant-premières, conseils et histoires horlogères. Directement dans votre boîte mail.', email:'Votre adresse e-mail', join:'S’inscrire', cart:'Votre panier', empty:'Votre panier est vide', emptySub:'Découvrez notre sélection de montres intemporelles.', continue:'Continuer mes achats', subtotal:'Sous-total', checkout:'Commander', shipping:'Livraison offerte dès 500 MAD', language:'العربية', items:'articles', filters:['Tous','Homme','Femme'], footer:'Montres de caractère, livrées partout au Maroc.', success:'Merci ! Bienvenue dans le cercle Maison Temps.'
  },
  ar: {
    nav:['الجديد','رجال','نساء','المجموعات'], search:'بحث', account:'حسابي', heroTag:'الأناقة في كل ثانية', heroTitle:<>الوقت<br/><em>ملكك.</em></>, heroText:'ساعات مميزة مختارة لمن يعرفون أن كل تفصيل يصنع الفرق.', shop:'اكتشف المجموعة', story:'قصتنا', new:'المجموعة الجديدة', curated:'اختياراتنا المميزة', curatedSub:'قطع خالدة صُممت لترافق أجمل لحظاتك.', all:'عرض الكل', add:'أضف إلى السلة', added:'تمت الإضافة', promise:'وعد ميزون تان', promiseText:'اهتمام مطلق، من النظرة الأولى حتى معصمك.', delivery:'توصيل مجاني', deliverySub:'في جميع أنحاء المغرب ابتداءً من 500 درهم', secure:'دفع آمن', secureSub:'عند الاستلام أو بالبطاقة', quality:'جودة مضمونة', qualitySub:'نفحص كل قطعة بعناية', support:'خدمة مميزة', supportSub:'متاحة يوميًا عبر واتساب', quote:'“الساعة لا تخبرك بالوقت فقط، بل تحكي كيف تختار أن تعيشه.”', journal:'المجلة', journalTitle:'فن اختيار ساعتك', journalText:'حجم الإطار، الحركة، السوار… اكتشف دليلنا لاختيار الساعة التي تشبهك حقًا.', read:'اقرأ الدليل', newsletter:'انضم إلى دائرتنا', newsletterText:'إصدارات حصرية ونصائح وقصص الساعات، مباشرة إلى بريدك.', email:'بريدك الإلكتروني', join:'اشتراك', cart:'سلة التسوق', empty:'سلتك فارغة', emptySub:'اكتشف مجموعتنا من الساعات الخالدة.', continue:'متابعة التسوق', subtotal:'المجموع', checkout:'إتمام الطلب', shipping:'توصيل مجاني ابتداءً من 500 درهم', language:'Français', items:'قطع', filters:['الكل','رجال','نساء'], footer:'ساعات مميزة، توصيل إلى جميع أنحاء المغرب.', success:'شكرًا! مرحبًا بك في دائرة ميزون تان.'
  }
};

const products = [
 {id:1, name:'Nocturne Classique', ar:'نوكتورن كلاسيك', type:'Homme', price:849, old:999, img:'/watch-noir.png', badge:'Bestseller', desc:'Cadran noir · Cuir véritable'},
 {id:2, name:'Émeraude Signature', ar:'إمرود سيغنتشر', type:'Homme', price:1190, img:'/watch-vert.png', badge:'Nouveau', desc:'Acier inoxydable · 40 mm'},
 {id:3, name:'Rivage Bleu', ar:'ريفاج بلو', type:'Homme', price:1090, img:'/watch-bleu.png', desc:'Cadran bleu · Acier brossé'},
 {id:4, name:'Lumière Dorée', ar:'لوميير دوريه', type:'Femme', price:790, old:920, img:'/watch-or.png', desc:'Finition dorée · 30 mm'}
];

function App(){
 const [lang,setLang]=useState('fr'); const t=copy[lang];
 const [cart,setCart]=useState([]); const [cartOpen,setCartOpen]=useState(false); const [menu,setMenu]=useState(false); const [filter,setFilter]=useState('Tous'); const [liked,setLiked]=useState([]); const [notice,setNotice]=useState('');
 const arabic=lang==='ar';
 useEffect(()=>{ document.documentElement.dir=arabic?'rtl':'ltr'; document.documentElement.lang=lang; },[lang,arabic]);
 const visible=useMemo(()=>products.filter(p=>filter==='Tous'||p.type===filter),[filter]);
 const total=cart.reduce((s,i)=>s+i.price*i.qty,0); const count=cart.reduce((s,i)=>s+i.qty,0);
 function add(p){ setCart(c=>{const hit=c.find(i=>i.id===p.id); return hit?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}]}); setNotice(p.id); setTimeout(()=>setNotice(''),1200); }
 function qty(id,n){setCart(c=>c.map(i=>i.id===id?{...i,qty:i.qty+n}:i).filter(i=>i.qty>0))}
 function scrollProducts(){document.querySelector('#collection')?.scrollIntoView({behavior:'smooth'})}
 return <div className="app">
   <div className="topbar"><span>{arabic?'توصيل مجاني للطلبات ابتداءً من 500 درهم':'Livraison offerte dès 500 MAD partout au Maroc'}</span><span className="top-right"><span>WhatsApp +212 6 00 00 00 00</span><button onClick={()=>setLang(arabic?'fr':'ar')}>{t.language}</button></span></div>
   <header>
    <button className="icon mobile" onClick={()=>setMenu(!menu)} aria-label="Menu">{menu?<X/>:<Menu/>}</button>
    <nav className={menu?'open':''}>{t.nav.map((n,i)=><a key={n} href="#collection" onClick={()=>{setMenu(false);setFilter(i===1?'Homme':i===2?'Femme':'Tous')}}>{n}</a>)}</nav>
    <a className="logo" href="#">MAISON <i>✦</i> TEMPS<span>HORLOGERIE · CASABLANCA</span></a>
    <div className="actions"><button className="text-action"><Search/><span>{t.search}</span></button><button className="text-action account"><span>{t.account}</span></button><button className="bag" onClick={()=>setCartOpen(true)} aria-label={t.cart}><ShoppingBag/><b>{count}</b></button></div>
   </header>

   <main>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">{t.heroTag}</span><h1>{t.heroTitle}</h1><p>{t.heroText}</p><div className="hero-buttons"><button className="primary" onClick={scrollProducts}>{t.shop}<ArrowRight/></button><button className="link-btn">{t.story}<span>↗</span></button></div></div>
      <div className="hero-image"><img src="/watch-bleu.png" alt="Montre Rivage Bleu"/><span className="vertical-note">CASABLANCA · MOROCCO · 2026</span><div className="hero-number">01 <i></i> 04</div></div>
    </section>

    <section className="collection" id="collection"><div className="section-head"><div><span className="eyebrow">{t.new}</span><h2>{t.curated}</h2><p>{t.curatedSub}</p></div><button className="view-all" onClick={()=>setFilter('Tous')}>{t.all}<ArrowRight/></button></div>
      <div className="filter-row">{t.filters.map((f,i)=>{const val=['Tous','Homme','Femme'][i]; return <button className={filter===val?'active':''} onClick={()=>setFilter(val)} key={f}>{f}</button>})}</div>
      <div className="products">{visible.map(p=><article className="product" key={p.id}><div className="product-img">{p.badge&&<span className="badge">{arabic?(p.badge==='Nouveau'?'جديد':'الأكثر مبيعًا'):p.badge}</span>}<button className={`heart ${liked.includes(p.id)?'on':''}`} onClick={()=>setLiked(x=>x.includes(p.id)?x.filter(id=>id!==p.id):[...x,p.id])}><Heart fill={liked.includes(p.id)?'currentColor':'none'}/></button><img src={p.img} alt={arabic?p.ar:p.name}/><button className="quick" onClick={()=>add(p)}>{notice===p.id?<><Check/>{t.added}</>:<><ShoppingBag/>{t.add}</>}</button></div><div className="product-info"><div><h3>{arabic?p.ar:p.name}</h3><p>{arabic?(p.type==='Homme'?'رجالية · إصدار مميز':'نسائية · إصدار مميز'):p.desc}</p></div><div className="price"><strong>{p.price.toLocaleString('fr-FR')} MAD</strong>{p.old&&<s>{p.old} MAD</s>}</div></div></article>)}</div>
    </section>

    <section className="promise"><div className="center-head"><span className="eyebrow">MAISON TEMPS</span><h2>{t.promise}</h2><p>{t.promiseText}</p></div><div className="benefits"><Benefit icon={<Truck/>} title={t.delivery} text={t.deliverySub}/><Benefit icon={<ShieldCheck/>} title={t.secure} text={t.secureSub}/><Benefit icon={<Star/>} title={t.quality} text={t.qualitySub}/><Benefit icon={<PackageCheck/>} title={t.support} text={t.supportSub}/></div></section>
    <section className="manifesto"><div className="manifesto-img"><img src="/watch-noir.png" alt="Maison Temps"/></div><div className="manifesto-copy"><span className="quote-mark">“</span><blockquote>{t.quote}</blockquote><span className="signature">— MAISON TEMPS</span></div></section>
    <section className="journal"><div className="journal-card"><span className="eyebrow">{t.journal}</span><h2>{t.journalTitle}</h2><p>{t.journalText}</p><button className="link-btn">{t.read}<ArrowRight/></button></div><div className="journal-img"><img src="/watch-vert.png" alt="Guide montre"/><span>LE GUIDE<br/>MAISON TEMPS</span></div></section>
    <section className="newsletter"><span className="spark">✦</span><h2>{t.newsletter}</h2><p>{t.newsletterText}</p><form onSubmit={e=>{e.preventDefault();e.currentTarget.reset();alert(t.success)}}><input required type="email" placeholder={t.email}/><button>{t.join}<ArrowRight/></button></form></section>
   </main>
   <footer><a className="logo light" href="#">MAISON <i>✦</i> TEMPS<span>HORLOGERIE · CASABLANCA</span></a><p>{t.footer}</p><div><a href="#collection">Instagram</a><a href="#collection">Contact</a><a href="#collection">Livraison & retours</a></div><small>© 2026 Maison Temps. Tous droits réservés.</small></footer>

   {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}></div>}
   <aside className={`cart ${cartOpen?'open':''}`}><div className="cart-head"><h2>{t.cart} <small>({count} {t.items})</small></h2><button className="icon" onClick={()=>setCartOpen(false)}><X/></button></div>{cart.length===0?<div className="empty"><ShoppingBag/><h3>{t.empty}</h3><p>{t.emptySub}</p><button className="primary" onClick={()=>{setCartOpen(false);scrollProducts()}}>{t.continue}</button></div>:<><div className="cart-list">{cart.map(i=><div className="cart-item" key={i.id}><img src={i.img}/><div><h3>{arabic?i.ar:i.name}</h3><p>{i.price} MAD</p><div className="qty"><button onClick={()=>qty(i.id,-1)}><Minus/></button><span>{i.qty}</span><button onClick={()=>qty(i.id,1)}><Plus/></button></div></div><button className="remove" onClick={()=>qty(i.id,-i.qty)}><X/></button></div>)}</div><div className="cart-foot"><div><span>{t.subtotal}</span><strong>{total.toLocaleString('fr-FR')} MAD</strong></div><p><Truck/> {t.shipping}</p><button className="primary" onClick={()=>alert(arabic?'سيتم توجيهك لإتمام الطلب':'Votre commande est prête à être finalisée.')}>{t.checkout}<ArrowRight/></button></div></>}</aside>
 </div>
}
function Benefit({icon,title,text}){return <div className="benefit"><span>{icon}</span><h3>{title}</h3><p>{text}</p></div>}
createRoot(document.getElementById('root')).render(<App/>);
