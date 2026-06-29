
const { useState, useEffect, useRef, useCallback } = React;

// ─── MOCK DATA ───────────────────────────────────────────────

const FAMILY = [
  {
    id:'tobias', slug:'tobias', name:'Tobias Okelo', role:'Father', color:'#2C6975',
    photo:'tobias_image.jpg',
    education:'Diploma in Business Management, Kenya Institute of Management (KIM)',
    bio: "A dedicated dad, business manager, and the family\'s chief handyman. Loves mentoring his kids and telling groan-worthy dad jokes.",
    hobbies: "Watching football, DIY home improvements, playing the guitar",
    funFact: "He can name the capital of every country in Africa in under 3 minutes.",
    social:{facebook:'@tobias.okelo',instagram:'@tobias.okelo',linkedin:'@tobias.okelo'},
    birthday:null, extras:{"Police Service Experience":' Serving in the Kenya Police Service, loves sharing stories from his time on the force'}
  },
  {
    id:'eunice', slug:'eunice', name:'Eunice Okelo', role:'Mother', color:'#E0B1CB',
    photo:'eunice_image.jpg',
    education: "Diploma in Early Childhood Education, XYZ College",
    bio: "The heart of the home, a passionate educator and the family\'s organiser-in-chief.",
    hobbies: "Baking, gardening, reading African literature",
    funFact: "She once ran a half-marathon dressed as a superhero.",
    social:{facebook:'@eunice.okelo',instagram:'@eunice.okelo',linkedin:'@eunice.okelo'},
    birthday:null, extras:{"farmingExperience":'Grew up on a farm, loves growing her own vegetables'}
  },
  {
    id:'grace', slug:'grace', name:'Grace Okelo', role:'Eldest Daughter', color:'#3d8a9a',
    photo:'grace_image.jpeg',
    education:'Migingo Girls School → Kisii Technical College (Diploma in IT)',
    bio: "Tech-savvy and creative, Grace loves coding and dreams of becoming a software developer.",
    hobbies: "Graphic design, playing chess, vlogging",
    funFact: "She built her first mobile app at age 17.",
    social:{github:'@gracecodes',linkedin:'@grace.okelo',instagram:'@grace.okelo'},
    birthday:'15th March, 2002',
    extras:{extracurricular:' soccer, dance?'}
  },
  {
    id:'alvince', slug:'alvince', name:'Alvince Okelo', role:'Only Son', color:'#1a4a55',
    photo:'alvince_image.jpg',
    education:'Ramba School → Karatina University (B.Sc. Computer Science)',
    bio: "A curious coder and natural leader, passionate about AI and robotics.",
    hobbies: "Coding competitions, basketball, video editing",
    funFact: "He taught himself Python from a book at age 14.",
    social:{github:'@AlvinceCodes',linkedin:'@alvince-okelo',twitter:'@alvince_dev'},
    birthday:'27th April, 2003',
    extras:{extracurricular:' robotics club, basketball team '}
  },
  {
    id:'debra', slug:'debra', name:'Debra Okelo', role:'Middle Daughter', color:'#7b68ee',
    photo:'debra_image.jpg',
    education:'Nyamira Girls School → Awaiting university admission',
    bio: "A determined student with a flair for science and a heart for community service.",
    hobbies: "Reading, singing in choir, volunteering",
    funFact: "She has read over 200 books and keeps a reading log on her phone.",
    social:{instagram:'@debra_reads',facebook:'@debra.okelo'},
    birthday:'25th May, 2007',
    extras:{desiredCareer:"Medicine / Nursing"}
  },
  {
    id:'ruth', slug:'ruth', name:'Ruth Okelo', role:'Youngest Daughter', color:'#ff7043',
    photo:'ruth_image.jpg',
    education:'Currently at Sinyolo Girls School',
    bio: "The family\'s sunshine – energetic, artistic, and full of questions.",
    hobbies:"Drawing, playing netball, making TikTok videos",
    funFact:"She won a district art competition with a portrait of her grandmother.",
    social:{tiktok:'@ruth123',instagram:'@ruth_art45'},
    birthday:'20th September, 2009',
    extras:{grade:'Grade 9', desiredCareer: "Artist / Content Creator"}
  }
];

const BLOG_POSTS = [
  {id:1,title:'Our Amazing Safari Adventure',category:'Vacations',date:'2025-03-15',author:'Eunice Okelo',
   thumb:'safari_adventure.jpg',isPublic:true,
   excerpt:'Last month we packed the car and drove to Maasai Mara for a long weekend. The kids were absolutely mesmerised by the lions...',
   content:'Last month we packed the car and drove to Maasai Mara for a long weekend. The kids were absolutely mesmerised by the lions, zebras, and the endless golden plains. Grace kept her camera busy, Alvince wrote code the whole way there (we have no idea how), and Ruth collected a rock from every rest stop. A memory we will treasure forever.'
  },
  {id:2,title:'Grace Graduates from Kisii Technical!',category:'Milestones',date:'2025-02-28',author:'Tobias Okelo',
   thumb:'grace_graduation.png',isPublic:true,
   excerpt:'We are bursting with pride! Grace officially received her Diploma in IT this week. The entire family showed up in matching outfits...',
   content:'We are bursting with pride! Grace officially received her Diploma in IT this week, a testament to her hard work and determination. The entire family showed up in matching outfits – Eunice\'s idea of course – and embarrassed her thoroughly. But underneath all the eye-rolls she was grinning ear to ear. Well done Grace!'
  },
  {id:3,title:'Alvince Wins the Science Fair!',category:'School Achievements',date:'2025-01-20',author:'Eunice Okelo',
   thumb:'science_fair.jpg',isPublic:false,
   excerpt:'Alvince brought home the gold at this year\'s inter-school science fair with his AI-powered crop disease detector...',
   content:'Alvince brought home the gold at this year\'s inter-school science fair with his AI-powered crop disease detector, a project that took three months of late nights and countless debugging sessions. His computer science professors at Karatina are calling it "genuinely promising". We couldn\'t be prouder.'
  },
  {id:4,title:'The Great Pizza Friday Incident',category:'Funny Stories',date:'2024-12-10',author:'Tobias Okelo',
   thumb:'pizza_friday.jpg',isPublic:false,
   excerpt:'Pizza Fridays are sacred in our house. But this particular Friday, Dad thought he could improve on the classic Margherita...',
   content:'Pizza Fridays are sacred in our house. But this particular Friday, Dad (me) thought he could improve on the classic Margherita by adding a "surprise ingredient" – pineapple AND avocado simultaneously. The kids staged a dramatic protest that lasted four hours. Mom quietly ordered from the takeaway shop. I have not lived it down.'
  },
  {id:5,title:'2024 Year in Review – What a Ride!',category:'Milestones',date:'2024-12-31',author:'Eunice Okelo',
   thumb:'year_in_review.png',isPublic:true,
   excerpt:'As we close out 2024, we look back at a year full of laughter, growth, a few tears, and so much love...',
   content:'As we close out 2024, we look back at a year full of laughter, growth, a few tears, and so much love. Grace started her IT career journey, Alvince aced his first year at Karatina, Debra finished her KCSE with flying colours, and Ruth discovered she is a formidable netball player. Tobias fixed that leaky tap. Eventually. Happy New Year from our family to yours!'
  }
];

const today = new Date();
const yr = today.getFullYear();
const mo = today.getMonth();

const mkDate = (y,m,d) => new Date(y,m-1,d);
const EVENTS = [
  {id:1,title:"Grace's Birthday",date:new Date(yr,mo,14),color:'#3d8a9a',member:'grace',type:'birthday'},
  {id:2,title:"Alvince's Birthday",date:new Date(yr,mo,21),color:'#1a4a55',member:'alvince',type:'birthday'},
  {id:3,title:'Church Service',date:new Date(yr,mo,7),color:'#2C6975',member:'all',type:'recurring'},
  {id:4,title:'Church Service',date:new Date(yr,mo,14),color:'#2C6975',member:'all',type:'recurring'},
  {id:5,title:'Church Service',date:new Date(yr,mo,21),color:'#2C6975',member:'all',type:'recurring'},
  {id:6,title:'Church Service',date:new Date(yr,mo,28),color:'#2C6975',member:'all',type:'recurring'},
  {id:7,title:'School Run',date:new Date(yr,mo,5),color:'#E0B1CB',member:'eunice',type:'recurring'},
  {id:8,title:'School Run',date:new Date(yr,mo,12),color:'#E0B1CB',member:'eunice',type:'recurring'},
  {id:9,title:'Karatina Uni Exam',date:new Date(yr,mo,18),color:'#1a4a55',member:'alvince',type:'school'},
  {id:10,title:'Soccer Practice',date:new Date(yr,mo,10),color:'#3d8a9a',member:'grace',type:'sports'},
  {id:11,title:'Soccer Practice',date:new Date(yr,mo,17),color:'#3d8a9a',member:'grace',type:'sports'},
  {id:12,title:'Dentist – Ruth',date:new Date(yr,mo,9),color:'#ff7043',member:'ruth',type:'medical'},
  {id:13,title:'Pizza Friday',date:new Date(yr,mo,6),color:'#FFE0B2',member:'all',type:'family'},
  {id:14,title:'Pizza Friday',date:new Date(yr,mo,13),color:'#FFE0B2',member:'all',type:'family'},
  {id:15,title:'Pizza Friday',date:new Date(yr,mo,20),color:'#FFE0B2',member:'all',type:'family'},
  {id:16,title:'Pizza Friday',date:new Date(yr,mo,27),color:'#FFE0B2',member:'all',type:'family'},
  {id:17,title:'Parents Date Night',date:new Date(yr,mo,22),color:'#E0B1CB',member:'parents',type:'family'},
  {id:18,title:'Debra Choir Rehearsal',date:new Date(yr,mo,8),color:'#7b68ee',member:'debra',type:'activity'},
  {id:19,title:'Debra Choir Rehearsal',date:new Date(yr,mo,15),color:'#7b68ee',member:'debra',type:'activity'},
  {id:20,title:'Basketball – Alvince',date:new Date(yr,mo,11),color:'#1a4a55',member:'alvince',type:'sports'},
  {id:21,title:'Basketball – Alvince',date:new Date(yr,mo,25),color:'#1a4a55',member:'alvince',type:'sports'},
  {id:22,title:'Netball – Ruth',date:new Date(yr,mo,16),color:'#ff7043',member:'ruth',type:'sports'},
  {id:23,title:'Eunice\'s Birthday',date:new Date(yr,mo,3),color:'#9b4a6b',member:'eunice',type:'birthday'},
  {id:24,title:'Family Movie Night',date:new Date(yr,mo,19),color:'#2C6975',member:'all',type:'family'},
];

const CHORES_INIT = [
  {id:1,child:'grace',task:'Wash dishes',points:5,status:'done',due:'Mon'},
  {id:2,child:'grace',task:'Sweep living room',points:5,status:'pending',due:'Tue'},
  {id:3,child:'alvince',task:'Take out trash',points:5,status:'done',due:'Mon'},
  {id:4,child:'alvince',task:'Mop kitchen floor',points:8,status:'pending',due:'Wed'},
  {id:5,child:'debra',task:'Clean bathroom',points:10,status:'pending',due:'Thu'},
  {id:6,child:'debra',task:'Fold laundry',points:5,status:'done',due:'Tue'},
  {id:7,child:'ruth',task:'Feed the dog',points:3,status:'done',due:'Daily'},
  {id:8,child:'ruth',task:'Tidy bedroom',points:5,status:'pending',due:'Fri'},
];

const POINTS_INIT = {grace:42,alvince:38,debra:29,ruth:21};

const MEALS_INIT = {
  Mon:{breakfast:'Uji (Porridge)',lunch:'Rice & Beans',dinner:'Ugali & Sukuma Wiki'},
  Tue:{breakfast:'Eggs & Toast',lunch:'Chapati & Lentils',dinner:'Beef Stew & Rice'},
  Wed:{breakfast:'Mandazi & Tea',lunch:'Leftover Stew',dinner:'Pilau'},
  Thu:{breakfast:'Fruit Salad',lunch:'Vegetable Soup',dinner:'Chicken & Ugali'},
  Fri:{breakfast:'Pancakes',lunch:'Sandwich Wrap',dinner:'Pizza (Friday special!)'},
  Sat:{breakfast:'Full Kenyan Fry-Up',lunch:'Nyama Choma & Kachumbari',dinner:'Pasta'},
  Sun:{breakfast:'Chapati & Tea',lunch:'Sunday Roast',dinner:'Light Snacks'},
};

const BUDGET_INIT = [
  {id:1,cat:'Rent & Utilities',budget:25000,spent:24200,color:'#2C6975'},
  {id:2,cat:'School Fees',budget:35000,spent:31500,color:'#3d8a9a'},
  {id:3,cat:'Groceries',budget:15000,spent:12800,color:'#E0B1CB'},
  {id:4,cat:'Holiday Savings',budget:10000,spent:4000,color:'#FFE0B2'},
  {id:5,cat:'Medical',budget:5000,spent:1200,color:'#7b68ee'},
  {id:6,cat:'Entertainment',budget:3000,spent:2400,color:'#ff7043'},
];

const RECIPES = [
  {id:1,name:'Ugali & Sukuma Wiki',cat:'Dinner',time:'30 min',img:'ugali.jpg',ingredients:['2 cups maize flour','4 cups water','1 bunch kale','2 tomatoes','1 onion','Salt'],steps:['Boil water in a heavy pot.','Add maize flour gradually, stirring.','Cook over low heat 20 min.','Fry onion & tomatoes, add kale.','Serve together.']},
  {id:2,name:'Pilau',cat:'Dinner',time:'60 min',img:'pilau.jpg',ingredients:['2 cups basmati rice','500g beef','Pilau spice mix','2 onions','Oil','Salt'],steps:['Brown onions in oil.','Add beef, cook through.','Add spices, rice and water.','Simmer until rice is done.']},
  {id:3,name:'Mandazi',cat:'Breakfast',time:'45 min',img:'mandazi.jpg',ingredients:['2 cups flour','1/2 cup sugar','1 egg','3/4 cup milk','1 tsp yeast','Cardamom'],steps:['Mix dry ingredients.','Add egg and milk to form dough.','Rest dough 1 hour.','Deep fry until golden.']},
  {id:4,name:'Chapati',cat:'Breakfast',time:'40 min',img:'chapati.jpg',ingredients:['3 cups flour','1 cup warm water','2 tbsp oil','1 tsp salt'],steps:['Knead dough well.','Rest 30 min.','Roll thin, cook on dry pan.','Add oil each side.']},
];

const GALLERY_IMAGES = [
  {id:1,url:'year_in_review.png',year:2023,event:'Christmas',child:'all'},
  {id:2,url:'grace_graduation.png',year:2025,event:'Graduation',child:'grace'},
  {id:3,url:'safari_2024.jpg',year:2024,event:'Safari',child:'all'},
  {id:4,url:'easter_2024.jpg',year:2024,event:'Easter',child:'all'},
  {id:5,url:'debra_choir.jpg',year:2024,event:'School',child:'debra'},
  {id:6,url:'ruth_netball.jpeg',year:2024,event:'Sports',child:'ruth'},
  {id:7,url:'pizza_friday.jpg',year:2025,event:'Family Night',child:'all'},
  {id:8,url:'science_fair.jpg',year:2025,event:'School',child:'alvince'},
  {id:9,url:'new_year_2024.png',year:2024,event:'New Year',child:'all'},
  {id:10,url:'wedding_anniversary.jpg',year:2024,event:'Anniversary',child:'all'},
  {id:11,url:'lake_victoria_trip.jpg',year:2023,event:'Travel',child:'all'},
  {id:12,url:'mom_birthday.jpg',year:2025,event:'Birthday',child:'eunice'},
];

const NOTES_INIT = [
  {id:1,text:'Remember to buy school shoes for Ruth!',author:'Eunice',to:'Tobias',date:'Today'},
  {id:2,text:'Alvince – your library book is overdue 📚',author:'Grace',to:'Alvince',date:'Yesterday'},
  {id:3,text:'Dad, the garden tap is leaking again 💧',author:'Debra',to:'Tobias',date:'2 days ago'},
];

const TRIVIA = [
  {q:'What is the family motto?',opts:['Together in love and faith','Work hard, play hard','Faith, family, fun','One for all, all for one'],a:0},
  {q:'Which university does Alvince attend?',opts:['Nairobi University','Karatina University','Egerton University','Kenyatta University'],a:1},
  {q:'What is Tobias\'s qualification?',opts:['CPA','B.Com','Diploma in Business Management','MBA'],a:2},
  {q:'What is Grace\'s superpower?',opts:['Baking','Coding & Graphic Design','Singing','Dancing'],a:1},
  {q:'Which school does Ruth attend?',opts:['Migingo Girls','Nyamira Girls','Sinyolo Girls','Alliance Girls'],a:2},
  {q:'What is the family\'s Friday tradition?',opts:['Movie night','Board games','Pizza Friday','Cooking contest'],a:2},
  {q:'Which family member is in choir?',opts:['Grace','Ruth','Debra','Eunice'],a:2},
  {q:'What sport does Ruth play?',opts:['Basketball','Soccer','Netball','Volleyball'],a:2},
];

const TRIPS = [
  {id:1,name:'Maasai Mara Safari',year:2024,img:'maasai_mara.jpg',desc:'An unforgettable family safari – lions, zebras, and way too many photos. Ruth kept calling them "tiger horses".',photos:['images/safari_1.jpg','images/safari_2.jpg']},
  {id:2,name:'Lake Victoria Weekend',year:2023,img:'lake_victoria_trip.jpg',desc:'Fresh tilapia, boat rides, and Tobias falling asleep in the hammock for three hours.',photos:['images/lake_1.jpg']},
];

const BUCKET_LIST = [
  {id:1,text:'Visit Amboseli National Park',votes:4},
  {id:2,text:'Road trip to Nairobi for a concert',votes:3},
  {id:3,text:'Camping trip to Mount Kenya',votes:5},
  {id:4,text:'Zanzibar beach holiday',votes:6},
  {id:5,text:'Visit relatives in Kisii',votes:2},
];

const KINDNESS_IDEAS = [
  'Write a thank-you note to a neighbour 💌',
  'Help a sibling with their homework 📚',
  'Draw something beautiful for Mum 🎨',
  'Tidy a room without being asked 🏠',
  'Share your snack with someone at school 🍎',
  'Call or visit an elderly relative 📞',
  'Water the garden without being asked 🌱',
  'Read a bedtime story to Ruth ⭐',
  'Compliment each family member sincerely 💛',
  'Do someone else\'s chore as a surprise 🎁',
];

const DATE_IDEAS = [
  'Sunset picnic at the park 🌅',
  'Cook a new recipe together 🍳',
  'Star-gazing with hot cocoa ⭐',
  'Movie marathon at home 🎬',
  'Drive and explore a new area 🚗',
  'Breakfast in bed 🛏️',
  'Visit a local market together 🛒',
  'Evening walk and ice cream 🍦',
];

const FAQS = [
  {q:'How do I access the private sections?',a:'Use the role switcher at the top right to switch between Public, Extended Family, Kid, and Parent views. Parents can access all sections.'},
  {q:'Who manages the Household Hub?',a:'Parents (Tobias and Eunice) manage the hub, but kids can view their chores and mark them complete.'},
  {q:'How do points work?',a:'Kids earn points by completing chores. Points can be redeemed in the Kids\' Zone Reward Store.'},
  {q:'Who do I contact for house repairs?',a:'Dad (Tobias) handles all repairs. For urgent matters, call him directly.'},
  {q:'Where are the family documents stored?',a:'Family Library → Important Documents. Protected by the parent password.'},
  {q:'How do I add a calendar event?',a:'Go to Calendar and click on any date to open the Add Event form.'},
  {q:'How do I reset the site password?',a:'This is a demo. Passwords are: parents zone → "parentsonly", documents → "family123". In a real deployment, contact your site administrator.'},
];

const CONTACTS = [
  {name:'Tobias',area:'House repairs, car maintenance, finances',icon:'fa-tools'},
  {name:'Eunice',area:'School forms, medical appointments, meal planning',icon:'fa-heart'},
  {name:'Grace',area:'Tech support, social media, IT questions',icon:'fa-laptop-code'},
  {name:'Alvince',area:'Computer programming, science projects',icon:'fa-robot'},
];

// ─── UTILITIES ───────────────────────────────────────────────

const ls = {
  get:(k,def)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):def;}catch{return def;}},
  set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}},
};

const fmt = d => d ? new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '';

// ─── TOAST PROVIDER ───────────────────────────────────────────

const ToastContext = React.createContext(null);

function ToastProvider({children}){
  const [toasts,setToasts]=useState([]);
  const add = useCallback((msg,type='info')=>{
    const id=Date.now();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3500);
  },[]);
  return (
    <ToastContext.Provider value={add}>
      {children}
      <div className="toast-container">
        {toasts.map(t=>(
          <div key={t.id} className={`toast ${t.type}`}>
            <i className={`fas ${t.type==='success'?'fa-check-circle':t.type==='warning'?'fa-exclamation-triangle':'fa-info-circle'}`} style={{color:t.type==='success'?'#4caf50':t.type==='warning'?'#ff9800':'var(--primary)'}}/>
            <span style={{fontSize:'.88rem'}}>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const useToast=()=>React.useContext(ToastContext);

// ─── MODAL ───────────────────────────────────────────────────

function Modal({title,onClose,children}){
  useEffect(()=>{
    const esc=(e)=>{if(e.key==='Escape')onClose();};
    document.addEventListener('keydown',esc);
    return()=>document.removeEventListener('keydown',esc);
  },[onClose]);
  return (
    <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal fade-in">
        <button className="modal-close" onClick={onClose}><i className="fas fa-times"/></button>
        <div className="modal-title">{title}</div>
        {children}
      </div>
    </div>
  );
}

// ─── NAVIGATION ───────────────────────────────────────────────

const NAV_LINKS=[
  {label:'Home',path:'home',roles:['public','extended','kid','parent']},
  {label:'About Us',path:'about',roles:['public','extended','kid','parent']},
  {label:'📅 Calendar',path:'calendar',roles:['extended','kid','parent'],private:true},
  {label:'Blog',path:'blog',roles:['public','extended','kid','parent']},
  {label:'🏠 Household',path:'household',roles:['extended','kid','parent'],private:true},
  {label:'🎓 School',path:'school',roles:['extended','kid','parent'],private:true},
  {label:'📚 Library',path:'library',roles:['extended','kid','parent'],private:true},
  {label:'✈️ Travel',path:'travel',roles:['public','extended','kid','parent']},
  {label:'💬 Messages',path:'messages',roles:['extended','kid','parent'],private:true},
  {label:'🖼️ Gallery',path:'gallery',roles:['public','extended','kid','parent']},
  {label:'🎮 Kids Zone',path:'kids',roles:['kid','parent'],private:true},
  {label:'👪 Parents',path:'parents',roles:['parent'],private:true},
  {label:'❓ Help',path:'help',roles:['public','extended','kid','parent']},
];

function Nav({page,setPage,role,setRole,dark,setDark}){
  const [menuOpen,setMenuOpen]=useState(false);
  const [roleMenu,setRoleMenu]=useState(false);
  const toast=useToast();

  React.useEffect(()=>{
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [menuOpen]);

  const canAccess=(r)=>r.roles.includes(role);
  const handleNav=(path)=>{
    const link=NAV_LINKS.find(l=>l.path===path);
    if(link&&!canAccess(link)){
      toast('Please log in to access this section','warning');return;
    }
    setPage(path);setMenuOpen(false);
  };
  const handleRole=(r)=>{
    setRole(r);setRoleMenu(false);
    ls.set('fh_role',r);
    toast(`Switched to ${r} view ✓`,'success');
  };

  const ROLE_LABELS={public:'👁️ Public',extended:'👨‍👩‍👧 Extended Family',kid:'👧 Kid',parent:'👪 Parent'};
  const ROLE_COLORS={public:'#E0B1CB',extended:'#FFE0B2',kid:'#b3e5fc',parent:'#c8e6c9'};

  return (
    <>
    <nav className="nav">
      <div className="nav-logo">
        <i className="fas fa-home"/>
        <span> Okelo </span> Family Hub
      </div>
      <div className="nav-links">
        {NAV_LINKS.map(l=>(
          <button key={l.path}
            className={`nav-link${page===l.path?' active':''}${!canAccess(l)?' locked':''}`}
            onClick={()=>handleNav(l.path)}
            title={!canAccess(l)?'Login required':''}
          >
            {!canAccess(l)&&<i className="fas fa-lock" style={{fontSize:'.7rem',marginRight:3}}/>}
            {l.label}
          </button>
        ))}
      </div>
      <div className="nav-right">
        <button className="icon-btn" onClick={()=>setDark(!dark)} title="Toggle dark mode">
          <i className={`fas fa-${dark?'sun':'moon'}`}/>
        </button>
        <div style={{position:'relative'}}>
          <button className="role-badge" style={{background:ROLE_COLORS[role]}} onClick={()=>setRoleMenu(!roleMenu)}>
            {ROLE_LABELS[role]} ▾
          </button>
          {roleMenu&&(
            <div style={{position:'absolute',right:0,top:'calc(100% + 8px)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'8px',minWidth:200,maxWidth:'calc(100vw - 32px)',boxShadow:'var(--shadow)',zIndex:2000}}>
              {Object.entries(ROLE_LABELS).map(([k,v])=>(
                <button key={k} onClick={()=>handleRole(k)}
                  style={{display:'block',width:'100%',padding:'8px 12px',border:'none',background:role===k?'var(--primary)':ROLE_COLORS[k],color:role===k?'#fff':'#333',borderRadius:8,marginBottom:4,cursor:'pointer',textAlign:'left',fontFamily:'Poppins',fontWeight:600,fontSize:'.85rem'}}>
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Open menu">
          <span/><span/><span/>
        </button>
      </div>
    </nav>
    {menuOpen&&(
      <div className="mobile-menu-backdrop" onClick={e=>{ if(e.target===e.currentTarget) setMenuOpen(false); }}>
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
          <button className="mobile-menu-close" onClick={()=>setMenuOpen(false)} aria-label="Close menu">×</button>
          {NAV_LINKS.map(l=>(
            <button key={l.path} className={`nav-link${page===l.path?' active':''}`} onClick={()=>handleNav(l.path)}>
              {!canAccess(l)&&<i className="fas fa-lock" style={{marginRight:4}}/>}{l.label}
            </button>
          ))}
        </div>
      </div>
    )}
    </>
  );
}

// ─── ACCESS GUARD ─────────────────────────────────────────────

function AccessGuard({role,required,children,setPage}){
  if(!required.includes(role)){
    return (
      <div className="lock-screen fade-in">
        <div className="lock-icon"><i className="fas fa-lock"/></div>
        <h2 style={{marginBottom:8}}>Members Only</h2>
        <p style={{color:'var(--text-m)',marginBottom:24}}>This section requires you to be logged in as a family member.</p>
        <button className="btn btn-primary" onClick={()=>{}}>Switch Role (top right) ↗</button>
      </div>
    );
  }
  return children;
}

// ─── HOME PAGE ────────────────────────────────────────────────

const HERO_IMGS = [
  'Family_image 1.png', // Replace with actual family photos
  'Family_image 2.png',
  'Family_image 3.png',
];

function HomePage({role,setPage}){
  const [imgIdx,setImgIdx]=useState(0);
  const [weather]=useState({temp:22,cond:'Partly Cloudy',loc:'Kisumu, Kenya',icon:'fa-cloud-sun'});
  const toast=useToast();
  useEffect(()=>{
    const t=setInterval(()=>setImgIdx(i=>(i+1)%HERO_IMGS.length),30000);
    return()=>clearInterval(t);
  },[]);
  const nextEvt=EVENTS.filter(e=>e.date>=today).sort((a,b)=>a.date-b.date)[0];
  const latestPost=BLOG_POSTS.find(p=>p.isPublic)||BLOG_POSTS[0];
  const canSee=role!=='public';

  return (
    <div className="fade-in">
      {/* Hero Slider */}
      <div className="slider-wrap" style={{margin:0}}>
        <img src={HERO_IMGS[imgIdx]} alt="Family" className="slider-img"/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,.5) 0%,transparent 60%)',display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'40px'}}>
          <h1 style={{color:'#fff',fontSize:'2.2rem',fontWeight:800,lineHeight:1.2,maxWidth:700}}>
            Welcome to the Okelo Family Hub
          </h1>
          <p style={{color:'rgba(255,255,255,.85)',marginTop:8,maxWidth:500}}>A place where memories live and life is organised.</p>
          <div style={{display:'flex',gap:8,marginTop:8}}>
            {HERO_IMGS.map((_,i)=>(<button key={i} onClick={()=>setImgIdx(i)} style={{width:i===imgIdx?24:8,height:8,borderRadius:4,border:'none',background:i===imgIdx?'#fff':'rgba(255,255,255,.5)',transition:'all .3s',cursor:'pointer'}}/>))}
          </div>
        </div>
      </div>

      <div className="page" style={{paddingTop:32}}>
        {/* Motto */}
        <div style={{textAlign:'center',marginBottom:32,borderRadius:'var(--radius-l)',position:'relative',overflow:'hidden',minHeight:200}}>
          <img src="imagesplaceholder2.jpg" alt="Family" style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',inset:0}}/>
          <div style={{position:'relative',zIndex:1,padding:'20px',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:'linear-gradient(135deg,rgba(44,105,117,.6),rgba(224,177,203,.5))'}}>
            <i className="fas fa-quote-left" style={{color:'#fff',fontSize:'1.5rem',opacity:.7}}/>
            <p style={{fontSize:'1.15rem',fontWeight:600,fontStyle:'italic',color:'#fff',margin:'8px 0'}}> Together in love and faith</p>
            <span style={{fontSize:'.8rem',color:'rgba(255,255,255,.8)'}}>Family Motto</span>
          </div>
        </div>

        {!canSee?(
          <div style={{textAlign:'center',padding:'40px 20px',background:'var(--bg-card)',borderRadius:'var(--radius-l)',border:'1px solid var(--border)'}}>
            <i className="fas fa-home" style={{fontSize:'3rem',color:'var(--primary)',marginBottom:16,display:'block'}}/>
            <h3 style={{marginBottom:8}}>Hello, Visitor! 👋</h3>
            <p style={{color:'var(--text-m)',maxWidth:500,margin:'0 auto 20px'}}>You're viewing the public version of the Okelo's Family Hub. Switch your role above to access the full family experience.</p>
            <button className="btn btn-primary" onClick={()=>setPage('about')}>Learn About Our Family</button>
          </div>
        ):(
          <>
          {/* Quick Links */}
          <h2 className="section-title" style={{marginBottom:16}}>Quick Links</h2>
          <div className="grid-3" style={{marginBottom:32}}>
            {[
              {icon:'fa-calendar-alt',label:'Family Calendar',path:'calendar'},
              {icon:'fa-utensils',label:'Meal Planner',path:'household'},
              {icon:'fa-tasks',label:'Chore Charts',path:'household'},
              {icon:'fa-images',label:'Gallery',path:'gallery'},
              {icon:'fa-blog',label:'Family Blog',path:'blog'},
              {icon:'fa-gamepad',label:'Kids Zone',path:'kids'},
            ].map(ql=>(
              <div key={ql.path+ql.label} className="quick-link" onClick={()=>setPage(ql.path)}>
                <div className="ql-icon"><i className={`fas ${ql.icon}`}/></div>
                <div className="ql-text">{ql.label}</div>
              </div>
            ))}
          </div>

          {/* Mini Feed */}
          <div className="sidebar-layout">
            <div>
              <h2 className="section-title" style={{marginBottom:16}}>Latest from the Blog</h2>
              <div className="blog-card" onClick={()=>setPage('blog')}>
                <img src={latestPost.thumb} alt={latestPost.title} className="blog-thumb"/>
                <div className="card-body">
                  <div className="blog-meta">
                    <span className="tag tag-teal">{latestPost.category}</span>
                    <span>{fmt(latestPost.date)}</span>
                    <span>by {latestPost.author}</span>
                  </div>
                  <div className="blog-title">{latestPost.title}</div>
                  <div className="blog-excerpt">{latestPost.excerpt}</div>
                </div>
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {/* Weather */}
              <div className="weather-card">
                <i className={`fas ${weather.icon}`} style={{fontSize:'2.5rem',marginBottom:8}}/>
                <div className="weather-temp">{weather.temp}°C</div>
                <div style={{fontSize:'1rem',marginBottom:4}}>{weather.cond}</div>
                <div className="weather-loc"><i className="fas fa-map-marker-alt"/> {weather.loc}</div>
                <div style={{fontSize:'.72rem',opacity:.6,marginTop:8}}>* Mock weather – integrate a real API key here</div>
              </div>
              {/* Next Event */}
              {nextEvt&&(
                <div className="card">
                  <div className="card-body">
                    <div style={{fontSize:'.78rem',fontWeight:700,textTransform:'uppercase',color:'var(--text-l)',marginBottom:8}}>Next Event</div>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:10,height:10,borderRadius:'50%',background:nextEvt.color,flexShrink:0}}/>
                      <div>
                        <div style={{fontWeight:600}}>{nextEvt.title}</div>
                        <div style={{fontSize:'.82rem',color:'var(--text-m)'}}>{fmt(nextEvt.date)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────

function ProfileCard({m,expanded}){
  const [exp,setExp]=useState(!!expanded);
  const socialIcons={facebook:'fab fa-facebook-f',instagram:'fab fa-instagram',linkedin:'fab fa-linkedin-in',github:'fab fa-github',twitter:'fab fa-twitter',tiktok:'fab fa-tiktok'};
  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <img src={m.photo} alt={m.name} className="profile-photo" style={{borderColor:m.color}}/>
        <div className="profile-name">{m.name}</div>
        <div className="profile-role" style={{color:m.color}}>{m.role}</div>
        {m.birthday&&<div style={{fontSize:'.78rem',color:'var(--text-l)'}}>🎂 {m.birthday}</div>}
      </div>
      <div className="profile-card-body">
        <div className="profile-section">
          <h4>Bio</h4>
          <p>{m.bio}</p>
        </div>
        <div className="profile-section">
          <h4>Education</h4>
          <p>{m.education}</p>
        </div>
        {exp&&(
          <>
          <div className="profile-section">
            <h4>Hobbies</h4>
            <p>{m.hobbies}</p>
          </div>
          <div className="profile-section">
            <h4>Fun Fact ✨</h4>
            <p>{m.funFact}</p>
          </div>
          {Object.entries(m.extras||{}).map(([k,v])=>(
            <div className="profile-section" key={k}>
              <h4>{k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase())}</h4>
              <p>{v}</p>
            </div>
          ))}
          </>
        )}
        <button className="btn btn-outline btn-sm" style={{marginBottom:12,width:'100%'}} onClick={()=>setExp(!exp)}>
          {exp?'Show Less ▲':'Show More ▼'}
        </button>
        <div className="social-links">
          {Object.entries(m.social||{}).map(([platform,url])=>(
            <a key={platform} href="#" className="social-link" title={`${platform}: ${url}`}>
              <i className={socialIcons[platform]||'fas fa-link'}/>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const MILESTONES = [
  {year:1997,text:'Tobias & Eunice marry in a beautiful ceremony surrounded by family and friends'},
  {year:2002,text:'Grace born – the family\'s first child'},
  {year:2003,text:'Alvince born – the only son arrives'},
  {year:2007,text:'Debra born – the family grows with another daughter'},
  {year:2009,text:'Ruth born – the youngest and sunshine of the home'},
  {year:2023,text:'Grace joins Kisii Technical College for IT studies '},
  {year:2023,text:'Alvince joins Karatina University for BSc Computer Science'},
  {year:2026,text:'Grace graduates with Diploma in IT 🎓'},
];

function AboutPage({setPage}){
  const [activeMember,setActiveMember]=useState(null);
  return (
    <div className="page fade-in">
      <div className="page-title">About Our Family</div>
      <p className="page-sub">Meet the Okelo's family – six individuals, one heart.</p>

      {/* Our Story */}
      <div className="card" style={{marginBottom:32}}>
        <div className="card-body">
          <h3 style={{color:'var(--primary)',marginBottom:12}}>Our Story</h3>
          <p style={{color:'var(--text-m)',fontStyle:'italic'}}>The Luo people of Kenya originated from Nilotic groups that migrated southward from regions of present-day South Sudan along the Nile Valley in search of water, pasture, and better living conditions, eventually reaching the Great Lakes region of East Africa where they settled around Lake Victoria; this lake, together with nearby rivers, became central to their way of life by providing fish, fertile land, and transport routes, leading to permanent settlement in areas such as Nyanza Province, where their culture, economy, and social structures developed around fishing, farming, and the strong cultural and spiritual connection to water bodies that guided their migration and sustained their community.
</p>
        </div>
      </div>

      {/* Family Members */}
      <h2 style={{marginBottom:20}}>Meet the Family</h2>
      <div className="grid-3" style={{marginBottom:48}}>
        {FAMILY.map(m=><ProfileCard key={m.id} m={m}/>)}
      </div>

      {/* Timeline */}
      <h2 style={{marginBottom:24}}>Family Timeline</h2>
      <div className="card" style={{marginBottom:40}}>
        <div className="card-body">
          <div className="timeline">
            {MILESTONES.map((m,i)=>(
              <div key={i} className="timeline-item">
                <div className="timeline-dot"/>
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-text">{m.text}</div>
              </div>
            ))}
            <div className="timeline-item">
              <div className="timeline-dot" style={{background:'var(--pink)'}}/>
              <div className="timeline-year">More</div>
              <div className="timeline-text">A six-member family began with two parents who worked hard to build a stable home and raise their four children with strong values and education. Over the years, the children achieved key milestones such as completing school, pursuing careers, and supporting one another through challenges and successes. Today, the family stands united, with improved living standards, shared achievements, and a vision for continued growth and future generations.
</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <h2 style={{marginBottom:20}}>Values & Traditions</h2>
      <div className="grid-2">
        {[
          {icon:'🍕',title:'Pizza Fridays','desc':'Every Friday without fail'},
          {icon:'⛪',title:'Sunday Church','desc':'We worship together as a family'},
          {icon:'📖',title:'Reading Time','desc':'Books are treasured in this house'},
          {icon:'🤝',title:'Helping Neighbours','desc':'We serve our community'},
          {icon:'🎄',title:'Christmas Traditions','desc':'Every Christmas we gather to celebrate'},
          {icon:'🌟',title:'Education First','desc':'Learning is our priority'},
        ].map(v=>(
          <div key={v.title} className="card">
            <div className="card-body" style={{display:'flex',gap:16,alignItems:'flex-start'}}>
              <div style={{fontSize:'1.8rem'}}>{v.icon}</div>
              <div>
                <div style={{fontWeight:700,marginBottom:4}}>{v.title}</div>
                <div style={{fontSize:'.87rem',color:'var(--text-m)'}}>{v.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CALENDAR PAGE ────────────────────────────────────────────

function CalendarPage({role}){
  const [curDate,setCurDate]=useState(new Date(yr,mo,1));
  const [events,setEvents]=useState(()=>ls.get('fh_events',EVENTS.map(e=>({...e,date:e.date.toISOString()}))));
  const [modal,setModal]=useState(false);
  const [selDate,setSelDate]=useState(null);
  const [newEvt,setNewEvt]=useState({title:'',color:'#2C6975',member:'all'});
  const toast=useToast();

  const evtList = events.map(e=>({...e,date:new Date(e.date)}));
  const year=curDate.getFullYear(),month=curDate.getMonth();
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const daysInPrev=new Date(year,month,0).getDate();

  const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const dayEvents=(d,m_,y_)=>evtList.filter(e=>e.date.getDate()===d&&e.date.getMonth()===m_&&e.date.getFullYear()===y_);

  const addEvent=()=>{
    if(!newEvt.title.trim()||!selDate)return;
    const ev={id:Date.now(),title:newEvt.title,date:selDate.toISOString(),color:newEvt.color,member:newEvt.member};
    const updated=[...events,ev];
    setEvents(updated);ls.set('fh_events',updated);
    toast(`Event "${newEvt.title}" added ✓`,'success');
    setModal(false);setNewEvt({title:'',color:'#2C6975',member:'all'});
  };

  const cells=[];
  for(let i=firstDay-1;i>=0;i--) cells.push({day:daysInPrev-i,month:month-1,year,other:true});
  for(let d=1;d<=daysInMonth;d++) cells.push({day:d,month,year,other:false});
  const rem=42-cells.length;
  for(let d=1;d<=rem;d++) cells.push({day:d,month:month+1,year,other:true});

  const thisWeekEvts=evtList.filter(e=>{
    const diff=(e.date-today)/(1000*60*60*24);
    return diff>=-1&&diff<=7;
  });

  return (
    <div className="page fade-in">
      <div className="section-header">
        <div>
          <div className="page-title">Family Calendar</div>
          <p className="page-sub">All family events in one place • Colour-coded by member</p>
        </div>
        {role==='parent'&&<button className="btn btn-primary" onClick={()=>{setSelDate(today);setModal(true);}}>+ Add Event</button>}
      </div>

      <div className="sidebar-layout">
        <div>
          <div className="cal-nav">
            <button className="btn btn-outline btn-sm" onClick={()=>setCurDate(new Date(year,month-1,1))}><i className="fas fa-chevron-left"/></button>
            <div className="cal-month-title">{MONTHS[month]} {year}</div>
            <button className="btn btn-outline btn-sm" onClick={()=>setCurDate(new Date(year,month+1,1))}><i className="fas fa-chevron-right"/></button>
          </div>
          <div className="cal-grid">
            {DAYS.map(d=><div key={d} className="cal-day-name">{d}</div>)}
            {cells.map((c,i)=>{
              const evs=dayEvents(c.day,c.month,c.year);
              const isToday=c.day===today.getDate()&&c.month===today.getMonth()&&c.year===today.getFullYear()&&!c.other;
              return (
                <div key={i} className={`cal-day${c.other?' other-month':''}${isToday?' today':''}`}
                  onClick={()=>{if(!c.other&&role==='parent'){setSelDate(new Date(c.year,c.month,c.day));setModal(true);}}}>
                  <div className="cal-day-num">{c.day}</div>
                  {evs.slice(0,3).map(e=>(
                    <div key={e.id} className="cal-event" style={{background:e.color}}>{e.title}</div>
                  ))}
                  {evs.length>3&&<div style={{fontSize:'.65rem',color:'var(--text-l)'}}>+{evs.length-3} more</div>}
                </div>
              );
            })}
          </div>
          {/* Legend */}
          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:16}}>
            {FAMILY.map(m=>(
              <div key={m.id} style={{display:'flex',alignItems:'center',gap:6,fontSize:'.78rem'}}>
                <div style={{width:10,height:10,borderRadius:2,background:m.color}}/>
                {m.name.split(' ')[0]}
              </div>
            ))}
          </div>
        </div>

        {/* This Week */}
        <div>
          <h3 style={{marginBottom:12}}>This Week</h3>
          {thisWeekEvts.length===0?(
            <div className="card"><div className="card-body" style={{color:'var(--text-m)',fontSize:'.87rem'}}>No events this week</div></div>
          ):thisWeekEvts.map(e=>(
            <div key={e.id} className="card" style={{marginBottom:8,borderLeft:`4px solid ${e.color}`}}>
              <div className="card-body" style={{padding:'10px 14px'}}>
                <div style={{fontWeight:600,fontSize:'.87rem'}}>{e.title}</div>
                <div style={{fontSize:'.78rem',color:'var(--text-m)'}}>{fmt(e.date)}</div>
              </div>
            </div>
          ))}
          <div className="info-box" style={{marginTop:16}}>
            <i className="fas fa-sync-alt"/> <strong>Calendar Sync</strong><br/>
            <small>Google Calendar sync – coming soon (toggle placeholder)</small>
          </div>
        </div>
      </div>

      {modal&&(
        <Modal title={`Add Event – ${selDate?.toDateString()}`} onClose={()=>setModal(false)}>
          <div className="form-group">
            <label className="form-label">Event Title</label>
            <input className="form-input" placeholder="e.g. Soccer practice" value={newEvt.title} onChange={e=>setNewEvt({...newEvt,title:e.target.value})}/>
          </div>
          <div className="form-group">
            <label className="form-label">Family Member</label>
            <select className="form-select form-input" value={newEvt.member} onChange={e=>setNewEvt({...newEvt,member:e.target.value})}>
              <option value="all">All Family</option>
              {FAMILY.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Colour</label>
            <input type="color" value={newEvt.color} onChange={e=>setNewEvt({...newEvt,color:e.target.value})} style={{width:60,height:36,border:'none',cursor:'pointer',borderRadius:8}}/>
          </div>
          <div style={{display:'flex',gap:10}}>
            <button className="btn btn-primary" style={{flex:1}} onClick={addEvent}>Add Event</button>
            <button className="btn btn-outline" onClick={()=>setModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── BLOG PAGE ────────────────────────────────────────────────

function BlogPage({role}){
  const [post,setPost]=useState(null);
  const [cat,setCat]=useState('All');
  const cats=['All','Milestones','Vacations','Funny Stories','School Achievements'];
  const isPriv=role!=='public';
  const visible=BLOG_POSTS.filter(p=>(isPriv||p.isPublic)&&(cat==='All'||p.category===cat));

  if(post){
    return (
      <div className="page page-sm fade-in">
        <button className="btn btn-outline btn-sm" style={{marginBottom:20}} onClick={()=>setPost(null)}>← Back to Blog</button>
        <img src={post.thumb} alt={post.title} style={{width:'100%',borderRadius:'var(--radius-l)',marginBottom:24,maxHeight:300,objectFit:'cover'}}/>
        <div className="blog-meta" style={{marginBottom:12}}>
          <span className="tag tag-teal">{post.category}</span>
          <span>{fmt(post.date)}</span>
          <span>by {post.author}</span>
          {!post.isPublic&&<span className="tag tag-pink"><i className="fas fa-lock" style={{marginRight:4,fontSize:'.7rem'}}/>Private</span>}
        </div>
        <h1 style={{fontSize:'1.8rem',fontWeight:800,marginBottom:20}}>{post.title}</h1>
        <p style={{color:'var(--text-m)',lineHeight:1.8,marginBottom:32}}>{post.content}</p>
        <div style={{display:'flex',gap:12,marginBottom:24,flexWrap:'wrap'}}>
          {['images/placeholder1.jpg','imagesplaceholder2.jpg'].map((src,i)=>(
            <img key={i} src={src} alt="" style={{borderRadius:8,flex:'1 1 180px',maxHeight:150,objectFit:'cover'}}/>
          ))}
        </div>
        {/* Mock comments */}
        <h3 style={{marginBottom:16}}>Comments</h3>
        {[{author:'Grandma',text:'So proud of you all! ❤️',date:'2 days ago'},{author:'Uncle James',text:'Amazing family! Keep it up!',date:'1 day ago'}].map((c,i)=>(
          <div key={i} style={{background:'var(--bg)',borderRadius:10,padding:'12px 16px',marginBottom:10}}>
            <div style={{fontWeight:700,fontSize:'.87rem'}}>{c.author} <span style={{color:'var(--text-l)',fontWeight:400,fontSize:'.78rem'}}>{c.date}</span></div>
            <div style={{fontSize:'.87rem',color:'var(--text-m)'}}>{c.text}</div>
          </div>
        ))}
        {isPriv&&(
          <div style={{marginTop:16}}>
            <textarea className="form-input" placeholder="Leave a comment..." style={{marginBottom:8}}/>
            <button className="btn btn-primary">Post Comment</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div className="page-title">News & Memories Blog</div>
      <p className="page-sub">Family stories, milestones, and adventures</p>
      {!isPriv&&<div className="info-box">You're viewing public posts only. Log in as a family member to see all posts.</div>}

      <div className="tabs">
        {cats.map(c=><button key={c} className={`tab${cat===c?' active':''}`} onClick={()=>setCat(c)}>{c}</button>)}
      </div>

      <div className="grid-2">
        {visible.map(p=>(
          <div key={p.id} className="blog-card" onClick={()=>setPost(p)}>
            <img src={p.thumb} alt={p.title} className="blog-thumb"/>
            <div className="card-body">
              <div className="blog-meta">
                <span className="tag tag-teal">{p.category}</span>
                <span>{fmt(p.date)}</span>
                {!p.isPublic&&<span className="tag tag-pink"><i className="fas fa-lock" style={{fontSize:'.7rem',marginRight:3}}/>Private</span>}
              </div>
              <div className="blog-title">{p.title}</div>
              <div className="blog-excerpt">{p.excerpt}</div>
              <div style={{marginTop:12,fontSize:'.8rem',color:'var(--primary)',fontWeight:600}}>Read more →</div>
            </div>
          </div>
        ))}
      </div>
      {visible.length===0&&<div style={{textAlign:'center',padding:'60px 20px',color:'var(--text-m)'}}>No posts in this category</div>}
    </div>
  );
}

// ─── HOUSEHOLD PAGE ───────────────────────────────────────────

function HouseholdPage({role}){
  const [tab,setTab]=useState('chores');
  const TABS=[
    {id:'chores',label:'🧹 Chores'},
    {id:'meals',label:'🍽️ Meals'},
    {id:'shopping',label:'🛒 Shopping'},
    {id:'allowance',label:'💰 Allowance'},
    {id:'budget',label:'📊 Budget'},
    {id:'maintenance',label:'🔧 Maintenance'},
  ];
  return (
    <div className="page fade-in">
      <div className="page-title">Household Hub</div>
      <p className="page-sub">Everything to keep the home running smoothly</p>
      <div className="tabs">{TABS.map(t=><button key={t.id} className={`tab${tab===t.id?' active':''}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}</div>
      {tab==='chores'&&<ChoresTab role={role}/>}
      {tab==='meals'&&<MealsTab role={role}/>}
      {tab==='shopping'&&<ShoppingTab/>}
      {tab==='allowance'&&<AllowanceTab role={role}/>}
      {tab==='budget'&&<BudgetTab role={role}/>}
      {tab==='maintenance'&&<MaintenanceTab role={role}/>}
    </div>
  );
}

function ChoresTab({role}){
  const [chores,setChores]=useState(()=>ls.get('fh_chores',CHORES_INIT));
  const [points,setPoints]=useState(()=>ls.get('fh_points',POINTS_INIT));
  const [showAdd,setShowAdd]=useState(false);
  const [newChore,setNewChore]=useState({child:'grace',task:'',points:5,due:'Mon'});
  const toast=useToast();
  const isParent=role==='parent';
  const kidFilter=role==='kid';

  const toggle=(id)=>{
    const updated=chores.map(c=>{
      if(c.id===id){
        const done=c.status==='pending';
        if(done){
          const pts={...points,[c.child]:(points[c.child]||0)+c.points};
          setPoints(pts);ls.set('fh_points',pts);
          toast(`+${c.points} points for ${c.child}! 🎉`,'success');
        }
        return{...c,status:done?'done':'pending'};
      }
      return c;
    });
    setChores(updated);ls.set('fh_chores',updated);
  };

  const addChore=()=>{
    if(!newChore.task.trim())return;
    const ch={...newChore,id:Date.now(),status:'pending'};
    const updated=[...chores,ch];
    setChores(updated);ls.set('fh_chores',updated);
    setShowAdd(false);setNewChore({child:'grace',task:'',points:5,due:'Mon'});
    toast('Chore added ✓','success');
  };

  const visible=chores.filter(c=>!kidFilter||(c.child===role));

  return (
    <div>
      <div className="section-header">
        <h3 className="section-title">Weekly Chore Chart</h3>
        {isParent&&<button className="btn btn-primary btn-sm" onClick={()=>setShowAdd(!showAdd)}>+ Add Chore</button>}
      </div>
      {showAdd&&(
        <div className="card" style={{marginBottom:20}}>
          <div className="card-body">
            <div className="chore-form-grid">
              <div>
                <div className="form-label">Child</div>
                <select className="form-select form-input" value={newChore.child} onChange={e=>setNewChore({...newChore,child:e.target.value})}>
                  {['grace','alvince','debra','ruth'].map(c=><option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <div className="form-label">Task</div>
                <input className="form-input" placeholder="Task description" value={newChore.task} onChange={e=>setNewChore({...newChore,task:e.target.value})}/>
              </div>
              <div>
                <div className="form-label">Points</div>
                <input type="number" className="form-input" value={newChore.points} onChange={e=>setNewChore({...newChore,points:+e.target.value})} min={1} max={20}/>
              </div>
              <div>
                <div className="form-label">Due</div>
                <select className="form-select form-input" value={newChore.due} onChange={e=>setNewChore({...newChore,due:e.target.value})}>
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Daily'].map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:'flex',gap:8,marginTop:12}}>
              <button className="btn btn-primary btn-sm" onClick={addChore}>Save</button>
              <button className="btn btn-outline btn-sm" onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="card">
        <div className="chore-header-row">
          <span>Child</span><span>Task</span><span className="chore-pts-hd">Points</span><span className="chore-due-hd">Due</span><span>Status</span>
        </div>
        {['grace','alvince','debra','ruth'].map(kid=>{
          const kidChores=visible.filter(c=>c.child===kid);
          if(kidChores.length===0)return null;
          return (
            <div key={kid}>
              <div style={{padding:'8px 16px',background:FAMILY.find(f=>f.id===kid)?.color+'22',fontWeight:700,fontSize:'.82rem',color:FAMILY.find(f=>f.id===kid)?.color}}>
                {kid.charAt(0).toUpperCase()+kid.slice(1)} – {points[kid]||0} pts
              </div>
              {kidChores.map(c=>(
                <div key={c.id} className={`chore-row${c.status==='done'?' done':''}`}>
                  <span style={{fontSize:'.87rem',color:'var(--text-m)'}}>{c.child}</span>
                  <span style={{fontSize:'.9rem',textDecoration:c.status==='done'?'line-through':'none'}}>{c.task}</span>
                  <span className="chore-pts"><span className="tag tag-teal">{c.points}pts</span></span>
                  <span className="chore-due" style={{fontSize:'.82rem',color:'var(--text-m)'}}>{c.due}</span>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div className={`chore-check${c.status==='done'?' done':''}`} onClick={()=>toggle(c.id)}>
                      {c.status==='done'&&<i className="fas fa-check" style={{fontSize:'.7rem'}}/>}
                    </div>
                    <span className={`tag ${c.status==='done'?'tag-green':'tag-peach'}`}>{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MealsTab({role}){
  const [meals,setMeals]=useState(()=>ls.get('fh_meals',MEALS_INIT));
  const [editing,setEditing]=useState(null);
  const [showList,setShowList]=useState(false);
  const toast=useToast();
  const DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const SLOTS=['breakfast','lunch','dinner'];

  const updateMeal=(day,slot,val)=>{
    const m={...meals,[day]:{...meals[day],[slot]:val}};
    setMeals(m);ls.set('fh_meals',m);
    setEditing(null);toast('Meal updated ✓','success');
  };

  const groceryList=['Maize flour (2kg)','Rice (2kg)','Kale (2 bunches)','Tomatoes (1kg)','Onions','Beef (500g)','Eggs (1 dozen)','Milk (2L)','Bread','Sugar','Cooking oil','Lentils'];

  return (
    <div>
      <div className="section-header">
        <h3 className="section-title">Weekly Meal Planner</h3>
        <button className="btn btn-outline btn-sm" onClick={()=>setShowList(!showList)}>
          <i className="fas fa-shopping-basket"/> Grocery List
        </button>
      </div>
      {showList&&(
        <div className="card" style={{marginBottom:20}}>
          <div className="card-body">
            <h4 style={{marginBottom:12}}>Generated Grocery List</h4>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:8}}>
              {groceryList.map(g=>(
                <div key={g} style={{display:'flex',gap:8,alignItems:'center',fontSize:'.87rem'}}>
                  <i className="fas fa-check-square" style={{color:'var(--primary)'}}/>{g}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div style={{overflowX:'auto'}}>
        <div style={{minWidth:'100%'}}>
          <div className="meal-grid">
            <div className="meal-label" style={{fontWeight:700,color:'var(--text)'}}>Meal</div>
            {DAYS.map(d=><div key={d} className="meal-header">{d}</div>)}
            {SLOTS.map(slot=>(
              <React.Fragment key={slot}>
                <div className="meal-label" style={{textTransform:'capitalize'}}>{slot}</div>
                {DAYS.map(day=>{
                  const val=meals[day]?.[slot]||'';
                  const isEd=editing?.day===day&&editing?.slot===slot;
                  return (
                    <div key={day} className="meal-cell" onClick={()=>role==='parent'&&setEditing({day,slot,val})}>
                      {isEd?(
                        <input autoFocus className="form-input" style={{padding:'4px 8px',fontSize:'.78rem',minHeight:0}} defaultValue={val}
                          onBlur={e=>updateMeal(day,slot,e.target.value)} onKeyDown={e=>e.key==='Enter'&&updateMeal(day,slot,e.target.value)}/>
                      ):(
                        <div className="meal-cell-name">{val||<span style={{color:'var(--text-l)',fontSize:'.72rem'}}>click to add</span>}</div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {role==='parent'&&<p style={{fontSize:'.78rem',color:'var(--text-l)',marginTop:8}}><i className="fas fa-info-circle"/> Click any meal cell to edit</p>}
    </div>
  );
}

function ShoppingTab(){
  const [lists,setLists]=useState(()=>ls.get('fh_shopping',{
    Groceries:['Maize flour','Tomatoes','Onions','Milk','Eggs'],
    Household:['Washing powder','Toilet rolls','Dishwashing liquid'],
    School:['Exercise books','Pens','Ruler'],
  }));
  const [activeList,setActiveList]=useState('Groceries');
  const [newItem,setNewItem]=useState('');
  const [checked,setChecked]=useState({});
  const toast=useToast();

  const addItem=()=>{
    if(!newItem.trim())return;
    const updated={...lists,[activeList]:[...lists[activeList],newItem]};
    setLists(updated);ls.set('fh_shopping',updated);
    setNewItem('');toast('Item added ✓','success');
  };

  const removeItem=(idx)=>{
    const arr=[...lists[activeList]];arr.splice(idx,1);
    const updated={...lists,[activeList]:arr};
    setLists(updated);ls.set('fh_shopping',updated);
  };

  return (
    <div>
      <h3 className="section-title" style={{marginBottom:16}}>Shopping Lists</h3>
      <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap'}}>
        {Object.keys(lists).map(l=>(
          <button key={l} className={`btn ${activeList===l?'btn-primary':'btn-outline'} btn-sm`} onClick={()=>setActiveList(l)}>{l}</button>
        ))}
      </div>
      <div className="card" style={{maxWidth:500}}>
        <div className="card-body">
          <div style={{display:'flex',gap:8,marginBottom:16}}>
            <input className="form-input" placeholder="Add item..." value={newItem} onChange={e=>setNewItem(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addItem()}/>
            <button className="btn btn-primary btn-sm" onClick={addItem}><i className="fas fa-plus"/></button>
          </div>
          {lists[activeList].map((item,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid var(--border-l)'}}>
              <div className={`chore-check${checked[activeList+i]?' done':''}`} onClick={()=>setChecked({...checked,[activeList+i]:!checked[activeList+i]})}>
                {checked[activeList+i]&&<i className="fas fa-check" style={{fontSize:'.7rem'}}/>}
              </div>
              <span style={{flex:1,textDecoration:checked[activeList+i]?'line-through':'none',color:checked[activeList+i]?'var(--text-l)':'var(--text)'}}>{item}</span>
              <button style={{border:'none',background:'none',color:'var(--text-l)',cursor:'pointer'}} onClick={()=>removeItem(i)}><i className="fas fa-trash-alt"/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AllowanceTab({role}){
  const [pts]=useState(()=>ls.get('fh_points',POINTS_INIT));
  const KES_RATE=2;
  return (
    <div>
      <h3 className="section-title" style={{marginBottom:4}}>Allowance & Points Tracker</h3>
      <p style={{color:'var(--text-m)',fontSize:'.87rem',marginBottom:20}}>2 points = KES 1 allowance</p>
      <div className="grid-4">
        {['grace','alvince','debra','ruth'].map(kid=>{
          const m=FAMILY.find(f=>f.id===kid);
          const p=pts[kid]||0;
          return (
            <div key={kid} className="card">
              <div className="card-body" style={{textAlign:'center'}}>
                <img src={m?.photo} alt={kid} style={{width:60,height:60,borderRadius:'50%',marginBottom:8}}/>
                <div style={{fontWeight:700,marginBottom:4}}>{kid.charAt(0).toUpperCase()+kid.slice(1)}</div>
                <div style={{fontSize:'1.6rem',fontWeight:800,color:'var(--primary)'}}>{p}</div>
                <div style={{fontSize:'.78rem',color:'var(--text-l)',marginBottom:12}}>points</div>
                <div style={{fontSize:'.87rem',color:'var(--text-m)'}}>≈ KES {(p/KES_RATE).toFixed(0)}</div>
                {role==='parent'&&(
                  <button className="btn btn-outline btn-sm" style={{marginTop:12,width:'100%'}}>Approve Withdraw</button>
                )}
                {role==='kid'&&kid==='grace'&&(
                  <button className="btn btn-pink btn-sm" style={{marginTop:12,width:'100%'}}>Request Withdrawal</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BudgetTab({role}){
  const [budget,setBudget]=useState(()=>ls.get('fh_budget',BUDGET_INIT));
  const [showAdd,setShowAdd]=useState(false);
  const [newExp,setNewExp]=useState({cat:'',amount:0});
  const toast=useToast();
  const total=budget.reduce((a,b)=>a+b.budget,0);
  const spent=budget.reduce((a,b)=>a+b.spent,0);

  const addExpense=()=>{
    const updated=budget.map(b=>b.cat===newExp.cat?{...b,spent:b.spent+Number(newExp.amount)}:b);
    setBudget(updated);ls.set('fh_budget',updated);
    setShowAdd(false);toast('Expense logged ✓','success');
  };

  return (
    <div>
      <div className="section-header">
        <h3 className="section-title">Family Budget Dashboard</h3>
        {role==='parent'&&<button className="btn btn-primary btn-sm" onClick={()=>setShowAdd(!showAdd)}>+ Add Expense</button>}
      </div>
      {/* Summary */}
      <div className="budget-summary-grid">
        {[{label:'Monthly Budget',val:`KES ${total.toLocaleString()}`,color:'var(--primary)'},{label:'Total Spent',val:`KES ${spent.toLocaleString()}`,color:'#f44336'},{label:'Remaining',val:`KES ${(total-spent).toLocaleString()}`,color:'#4caf50'}].map(s=>(
          <div key={s.label} className="card">
            <div className="card-body" style={{textAlign:'center'}}>
              <div style={{fontSize:'1.4rem',fontWeight:800,color:s.color}}>{s.val}</div>
              <div style={{fontSize:'.8rem',color:'var(--text-m)'}}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      {showAdd&&(
        <div className="card" style={{marginBottom:20}}>
          <div className="card-body">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div>
                <div className="form-label">Category</div>
                <select className="form-select form-input" value={newExp.cat} onChange={e=>setNewExp({...newExp,cat:e.target.value})}>
                  <option value="">Select...</option>
                  {budget.map(b=><option key={b.id} value={b.cat}>{b.cat}</option>)}
                </select>
              </div>
              <div>
                <div className="form-label">Amount (KES)</div>
                <input type="number" className="form-input" value={newExp.amount} onChange={e=>setNewExp({...newExp,amount:e.target.value})}/>
              </div>
            </div>
            <div style={{display:'flex',gap:8,marginTop:12}}>
              <button className="btn btn-primary btn-sm" onClick={addExpense}>Log Expense</button>
              <button className="btn btn-outline btn-sm" onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        {budget.map(b=>{
          const pct=Math.min((b.spent/b.budget)*100,100);
          return (
            <div key={b.id} className="budget-category">
              <div className="budget-header">
                <div className="budget-name">{b.cat}</div>
                <div className="budget-amounts">KES {b.spent.toLocaleString()} / {b.budget.toLocaleString()}</div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width:`${pct}%`,background:pct>90?'#f44336':pct>70?'#ff9800':b.color}}/>
              </div>
              <div style={{fontSize:'.75rem',color:'var(--text-l)',marginTop:6}}>{pct.toFixed(1)}% used</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MaintenanceTab({role}){
  const [log,setLog]=useState(()=>ls.get('fh_maint',[
    {id:1,date:'2025-03-10',task:'Fix kitchen tap',status:'done',notes:'Replaced washer'},
    {id:2,date:'2025-02-28',task:'Paint front gate',status:'done',notes:'Used black gloss'},
    {id:3,date:'2025-04-01',task:'Service car',status:'pending',notes:'Due soon'},
  ]));
  const [showAdd,setShowAdd]=useState(false);
  const [newLog,setNewLog]=useState({task:'',notes:'',status:'pending'});
  const toast=useToast();

  const add=()=>{
    const entry={id:Date.now(),date:new Date().toISOString().slice(0,10),task:newLog.task,notes:newLog.notes,status:newLog.status};
    const u=[entry,...log];setLog(u);ls.set('fh_maint',u);
    setShowAdd(false);setNewLog({task:'',notes:'',status:'pending'});
    toast('Entry logged ✓','success');
  };

  return (
    <div>
      <div className="section-header">
        <h3 className="section-title">Maintenance Log</h3>
        {role==='parent'&&<button className="btn btn-primary btn-sm" onClick={()=>setShowAdd(!showAdd)}>+ Add Entry</button>}
      </div>
      {showAdd&&(
        <div className="card" style={{marginBottom:20}}>
          <div className="card-body">
            <div className="form-group"><div className="form-label">Task</div><input className="form-input" value={newLog.task} onChange={e=>setNewLog({...newLog,task:e.target.value})}/></div>
            <div className="form-group"><div className="form-label">Notes</div><input className="form-input" value={newLog.notes} onChange={e=>setNewLog({...newLog,notes:e.target.value})}/></div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-primary btn-sm" onClick={add}>Save</button>
              <button className="btn btn-outline btn-sm" onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="card">
        {log.map(l=>(
          <div key={l.id} style={{padding:'14px 16px',borderBottom:'1px solid var(--border-l)',display:'flex',gap:12,alignItems:'flex-start'}}>
            <div style={{width:40,height:40,borderRadius:10,background:l.status==='done'?'rgba(76,175,80,.1)':'rgba(255,152,0,.1)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <i className={`fas ${l.status==='done'?'fa-check':'fa-clock'}`} style={{color:l.status==='done'?'#4caf50':'#ff9800'}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600}}>{l.task}</div>
              <div style={{fontSize:'.82rem',color:'var(--text-m)'}}>{l.notes}</div>
              <div style={{fontSize:'.75rem',color:'var(--text-l)',marginTop:4}}>{fmt(l.date)}</div>
            </div>
            <span className={`tag ${l.status==='done'?'tag-green':'tag-peach'}`}>{l.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCHOOL PAGE ──────────────────────────────────────────────

function SchoolPage({role}){
  const [kid,setKid]=useState('grace');
  const isParent=role==='parent';
  const kids=FAMILY.filter(f=>['grace','alvince','debra','ruth'].includes(f.id));
  const SCHEDULES={
    grace:[{time:'8:00',subj:'Mathematics'},{time:'9:00',subj:'Web Development'},{time:'10:00',subj:'Database Systems'},{time:'11:00',subj:'Networking'},{time:'13:00',subj:'Project Work'}],
    alvince:[{time:'8:00',subj:'Algorithms'},{time:'9:00',subj:'Machine Learning'},{time:'10:00',subj:'Computer Architecture'},{time:'11:00',subj:'Discrete Maths'},{time:'13:00',subj:'Lab Session'}],
    debra:[{time:'7:30',subj:'Biology'},{time:'8:30',subj:'Chemistry'},{time:'9:30',subj:'Mathematics'},{time:'10:30',subj:'English'},{time:'11:30',subj:'Kiswahili'}],
    ruth:[{time:'7:30',subj:'English'},{time:'8:30',subj:'Mathematics'},{time:'9:30',subj:'Science'},{time:'10:30',subj:'Social Studies'},{time:'11:30',subj:'Art & Craft'}],
  };
  const m=FAMILY.find(f=>f.id===kid);
  return (
    <div className="page fade-in">
      <div className="page-title">School & Activities</div>
      <p className="page-sub">Academic schedules, contacts, and achievements</p>
      <div style={{display:'flex',gap:8,marginBottom:24,flexWrap:'wrap'}}>
        {kids.map(k=>(
          <button key={k.id} className={`btn btn-sm ${kid===k.id?'btn-primary':'btn-outline'}`} onClick={()=>setKid(k.id)}>
            {k.name.split(' ')[0]}
          </button>
        ))}
      </div>
      {m&&(
        <div className="fade-in">
          <div style={{display:'flex',gap:16,alignItems:'center',marginBottom:24,background:'var(--bg-card)',borderRadius:'var(--radius-l)',padding:20,border:'1px solid var(--border)',flexWrap:'wrap'}}>
            <img src={m.photo} alt={m.name} style={{width:64,height:64,borderRadius:'50%'}}/>
            <div>
              <div style={{fontWeight:700,fontSize:'1.1rem'}}>{m.name}</div>
              <div style={{color:'var(--primary)',fontSize:'.87rem'}}>{m.education}</div>
            </div>
          </div>
          <div className="sidebar-layout">
            <div>
              <h3 style={{marginBottom:12}}>Class Schedule</h3>
              <div className="card">
                {(SCHEDULES[kid]||[]).map((s,i)=>(
                  <div key={i} style={{display:'flex',gap:16,padding:'10px 16px',borderBottom:'1px solid var(--border-l)',alignItems:'center'}}>
                    <div style={{width:50,fontSize:'.8rem',fontWeight:700,color:'var(--primary)',flexShrink:0}}>{s.time}</div>
                    <div style={{fontSize:'.9rem'}}>{s.subj}</div>
                  </div>
                ))}
              </div>
              {['grace','alvince','debra'].includes(kid)&&(
                <div style={{marginTop:24}}>
                  <h3 style={{marginBottom:12}}>College / Career Planning</h3>
                  <div className="card">
                    <div className="card-body">
                      {[
                        {task:'Update CV/Resume',done:kid==='grace'},
                        {task:'Research universities / career options',done:false},
                        {task:'Prepare application documents',done:kid==='grace'},
                        {task:'Apply for scholarships',done:false},
                        {task:'Attend open days',done:false},
                      ].map((t,i)=>(
                        <div key={i} style={{display:'flex',gap:10,alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--border-l)'}}>
                          <div className={`chore-check${t.done?' done':''}`}>{t.done&&<i className="fas fa-check" style={{fontSize:'.7rem'}}/>}</div>
                          <span style={{textDecoration:t.done?'line-through':'none',color:t.done?'var(--text-l)':'var(--text)'}}>{t.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <h3 style={{marginBottom:12}}>Teacher Contacts</h3>
              <div className="card">
                <div className="card-body">
                  {['Form Teacher','Head of Department','School Counsellor'].map(t=>(
                    <div key={t} style={{marginBottom:12,padding:'10px 12px',background:'var(--bg)',borderRadius:8}}>
                      <div style={{fontWeight:600,fontSize:'.87rem'}}>{t}</div>
                      <div style={{fontSize:'.82rem',color:isParent?'var(--text-m)':'transparent',background:isParent?'transparent':'var(--text-l)',borderRadius:4}}>
                        {isParent?'Mr. Onyoka Martin , 0700 123 456':'🔒 Visible to parents only'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <h3 style={{marginBottom:12,marginTop:20}}>Report Cards</h3>
              <div className="card">
                <div className="card-body">
                  {['Term 1 2024','Term 2 2024','Term 3 2024'].map(t=>(
                    <div key={t} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--border-l)'}}>
                      <span style={{fontSize:'.87rem'}}>{t}</span>
                      <div className="encrypted-badge"><i className="fas fa-lock"/>PDF</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LIBRARY PAGE ─────────────────────────────────────────────

function LibraryPage({role}){
  const [tab,setTab]=useState('recipes');
  const [search,setSearch]=useState('');
  const [docModal,setDocModal]=useState(false);
  const [docPass,setDocPass]=useState('');
  const [docOpen,setDocOpen]=useState(false);
  const toast=useToast();
  const TABS=[{id:'recipes',label:'🍳 Recipes'},{id:'docs',label:'📁 Documents'},{id:'medical',label:'🏥 Medical'},{id:'manuals',label:'📖 Manuals'},{id:'packing',label:'🧳 Packing Lists'}];

  const openDocs=()=>{
    if(docPass==='family123'){setDocOpen(true);setDocModal(false);toast('Documents unlocked ✓','success');}
    else toast('Incorrect password','warning');
  };

  const filtered=RECIPES.filter(r=>r.name.toLowerCase().includes(search.toLowerCase())||r.cat.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page fade-in">
      <div className="page-title">Family Library</div>
      <p className="page-sub">Recipes, documents, medical info, and more</p>
      <div className="tabs">{TABS.map(t=><button key={t.id} className={`tab${tab===t.id?' active':''}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}</div>

      {tab==='recipes'&&(
        <div>
          <input className="form-input" style={{maxWidth:400,marginBottom:20}} placeholder="🔍 Search recipes..." value={search} onChange={e=>setSearch(e.target.value)}/>
          <div className="grid-3">
            {filtered.map(r=>(
              <div key={r.id} className="card" style={{cursor:'pointer'}}>
                <img src={r.img} alt={r.name} style={{width:'100%',height:140,objectFit:'cover'}}/>
                <div className="card-body">
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                    <span className="tag tag-teal">{r.cat}</span>
                    <span style={{fontSize:'.78rem',color:'var(--text-l)'}}><i className="fas fa-clock"/> {r.time}</span>
                  </div>
                  <div style={{fontWeight:700,marginBottom:8}}>{r.name}</div>
                  <details>
                    <summary style={{cursor:'pointer',fontSize:'.85rem',color:'var(--primary)',fontWeight:600}}>View Recipe</summary>
                    <div style={{marginTop:10}}>
                      <div style={{fontWeight:600,fontSize:'.82rem',marginBottom:4}}>Ingredients</div>
                      <ul style={{paddingLeft:16,fontSize:'.82rem',color:'var(--text-m)',marginBottom:8}}>{r.ingredients.map(i=><li key={i}>{i}</li>)}</ul>
                      <div style={{fontWeight:600,fontSize:'.82rem',marginBottom:4}}>Steps</div>
                      <ol style={{paddingLeft:16,fontSize:'.82rem',color:'var(--text-m)'}}>{r.steps.map(s=><li key={s} style={{marginBottom:4}}>{s}</li>)}</ol>
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='docs'&&(
        <div>
          {!docOpen?(
            <div style={{textAlign:'center',padding:'60px 20px'}}>
              <div style={{fontSize:'3rem',marginBottom:16}}><i className="fas fa-folder-lock" style={{color:'var(--primary)'}}/></div>
              <h3 style={{marginBottom:8}}>Important Documents</h3>
              <p style={{color:'var(--text-m)',marginBottom:24}}>Protected area – enter the family password to access</p>
              <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
                <input type="password" className="form-input" style={{maxWidth:240}} placeholder="Family password" value={docPass} onChange={e=>setDocPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&openDocs()}/>
                <button className="btn btn-primary" onClick={openDocs}>Unlock</button>
              </div>
              <p style={{fontSize:'.78rem',color:'var(--text-l)',marginTop:12}}>Demo password: family123</p>
            </div>
          ):(
            <div>
              <div className="info-box"><i className="fas fa-shield-alt"/> <strong>Encrypted on server</strong> – Files are stored securely. Real IDs and sensitive numbers are never displayed here.</div>
              {['National ID – Tobias Okelo','National ID – Eunice Okelo','Birth Certificate – Grace','Birth Certificate – Alvince','Birth Certificate – Debra','Birth Certificate – Ruth','Insurance Card – Family NHIF','Car Insurance','Title Deed: Home Ownership 4567778'].map(d=>(
                <div key={d} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',background:'var(--bg-card)',borderRadius:10,marginBottom:8,border:'1px solid var(--border)'}}>
                  <div style={{display:'flex',gap:10,alignItems:'center'}}>
                    <i className="fas fa-file-alt" style={{color:'var(--primary)'}}/>
                    <span style={{fontSize:'.9rem'}}>{d}</span>
                  </div>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <div className="encrypted-badge"><i className="fas fa-lock"/> Encrypted</div>
                    <button className="btn btn-outline btn-sm">View</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab==='medical'&&(
        <div className="grid-2">
          {FAMILY.map(m=>(
            <div key={m.id} className="card">
              <div className="card-body">
                <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:12}}>
                  <img src={m.photo} alt={m.name} style={{width:40,height:40,borderRadius:'50%'}}/>
                  <div style={{fontWeight:700}}>{m.name}</div>
                </div>
                {[{label:'Allergies',val:'No Allergies'},{label:'Medications',val:'Undergoing some Treatment'},{label:'Doctor',val:' Dr. Samwel Kosgei, 0700 123 456'},{label:'Blood Type',val:'O+'}].map(f=>(
                  <div key={f.label} style={{fontSize:'.85rem',marginBottom:6}}>
                    <span style={{fontWeight:600,color:'var(--text-m)'}}>{f.label}: </span>
                    <span style={{color:'var(--text)'}}>{f.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==='manuals'&&(
        <div className="card">
          <div className="card-body">
            <h3 style={{marginBottom:16}}>Appliance Manuals</h3>
            {['Samsung Washing Machine – Model X200','LG Refrigerator – Manual PDF','Sony TV – Remote Guide','Cooker / Oven Manual','Generator – Safety Guide'].map(m=>(
              <div key={m} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid var(--border-l)'}}>
                <div style={{display:'flex',gap:10,alignItems:'center',fontSize:'.9rem'}}><i className="fas fa-file-pdf" style={{color:'#f44336'}}/>{m}</div>
                <button className="btn btn-outline btn-sm"><i className="fas fa-download"/> Download</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='packing'&&(
        <div className="grid-2">
          {[{title:'🏖️ Beach Trip',items:['Sunscreen','Swimwear','Towels','Sandals','Sunglasses','Camera','Snacks','Water bottles','First aid kit']},{title:'🏕️ Camping',items:['Tent','Sleeping bags','Torch','Matches','Insect repellent','Boots','Warm jackets','Cooking pots','Rope']},{title:'🚗 Road Trip',items:['Snacks','Water','Car games','Music playlist','Emergency kit','Phone chargers','Maps/GPS','Blankets']},{title:'✈️ Flight',items:['Passports','Travel documents','Neck pillows','Earphones','Books','Change of clothes','Medications','Currency']}].map(list=>(
            <div key={list.title} className="card">
              <div className="card-body">
                <h3 style={{marginBottom:12}}>{list.title}</h3>
                {list.items.map((item,i)=>(
                  <label key={i} style={{display:'flex',gap:8,alignItems:'center',padding:'6px 0',cursor:'pointer',fontSize:'.88rem'}}>
                    <input type="checkbox" style={{accentColor:'var(--primary)'}}/>
                    {item}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TRAVEL PAGE ──────────────────────────────────────────────

function TravelPage(){
  const [bucket,setBucket]=useState(()=>ls.get('fh_bucket',BUCKET_LIST));
  const vote=(id)=>{
    const upd=bucket.map(b=>b.id===id?{...b,votes:b.votes+1}:b);
    setBucket(upd);ls.set('fh_bucket',upd);
  };
  return (
    <div className="page fade-in">
      <div className="page-title">Travel & Adventures</div>
      <p className="page-sub">Our journeys, big and small</p>
      <h2 style={{marginBottom:16}}>Past Trips</h2>
      <div className="grid-2" style={{marginBottom:40}}>
        {TRIPS.map(trip=>(
          <div key={trip.id} className="card">
            <img src={trip.img} alt={trip.name} style={{width:'100%',height:200,objectFit:'cover'}}/>
            <div className="card-body">
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <h3 style={{fontSize:'1.05rem'}}>{trip.name}</h3>
                <span className="tag tag-teal">{trip.year}</span>
              </div>
              <p style={{fontSize:'.87rem',color:'var(--text-m)',marginBottom:12}}>{trip.desc}</p>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {trip.photos.map((p,i)=>(
                  <img key={i} src={p} alt="" style={{height:60,flex:'1 1 100px',objectFit:'cover',borderRadius:6}}/>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-layout" style={{marginBottom:40}}>
        <div>
          <h2 style={{marginBottom:16}}>Family Bucket List ❤️</h2>
          {bucket.sort((a,b)=>b.votes-a.votes).map(item=>(
            <div key={item.id} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:10,marginBottom:8}}>
              <span style={{flex:1,fontSize:'.9rem'}}>{item.text}</span>
              <button onClick={()=>vote(item.id)} style={{border:'none',background:'rgba(244,67,54,.1)',color:'#f44336',padding:'4px 12px',borderRadius:20,cursor:'pointer',fontWeight:700,fontSize:'.82rem',display:'flex',alignItems:'center',gap:4}}>
                ❤️ {item.votes}
              </button>
            </div>
          ))}
        </div>
        <div>
          <h2 style={{marginBottom:16}}>Car Packing Layout</h2>
          <div className="card">
            <div className="card-body">
              <div style={{background:'var(--bg)',borderRadius:10,padding:20,textAlign:'center',border:'2px dashed var(--border)'}}>
                <div style={{fontSize:'2rem',marginBottom:8}}>🚗</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:8}}>
                  {['Grace\nwindow','Alvince\nmiddle','Debra\nmiddle','Ruth\nwindow'].map((s,i)=>(
                    <div key={i} style={{background:'var(--primary)',color:'#fff',borderRadius:8,padding:'10px 8px',fontSize:'.75rem',fontWeight:600,whiteSpace:'pre-line'}}>{s}</div>
                  ))}
                </div>
                <div style={{background:'var(--border)',borderRadius:8,padding:'8px',fontSize:'.8rem',fontWeight:600,marginBottom:8}}>🧳 Boot / Luggage</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                  <div style={{background:'var(--pink)',borderRadius:8,padding:'8px',fontSize:'.75rem',fontWeight:600,color:'#5a2040'}}>Dad driver</div>
                  <div style={{background:'var(--peach)',borderRadius:8,padding:'8px',fontSize:'.75rem',fontWeight:600,color:'#7a4a00'}}>Mum co-pilot</div>
                </div>
              </div>
              <p style={{fontSize:'.75rem',color:'var(--text-l)',marginTop:8,textAlign:'center'}}>Drag-and-drop layout – interactive in full version</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MESSAGES PAGE ────────────────────────────────────────────

function MessagesPage(){
  const [notes,setNotes]=useState(()=>ls.get('fh_notes',NOTES_INIT));
  const [newNote,setNewNote]=useState('');
  const [to,setTo]=useState('all');
  const [email,setEmail]=useState('');
  const [subbed,setSubbed]=useState(false);
  const [lostFound,setLostFound]=useState([
    {id:1,item:'Ruth\'s blue water bottle',status:'missing'},{id:2,item:'Alvince\'s library book',status:'found'},{id:3,item:'Car keys spare set',status:'missing'},
  ]);
  const toast=useToast();

  const addNote=()=>{
    if(!newNote.trim())return;
    const n={id:Date.now(),text:newNote,author:'Me',to,date:'Just now'};
    const upd=[n,...notes];setNotes(upd);ls.set('fh_notes',upd);
    setNewNote('');toast('Note posted ✓','success');
  };

  return (
    <div className="page fade-in">
      <div className="page-title">Communication Centre</div>
      <p className="page-sub">Notes, messages, and more</p>

      <div className="sidebar-layout">
        <div>
          <h3 style={{marginBottom:12}}>📌 Family Notice Board</h3>
          <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
            <input className="form-input" style={{flex:1}} placeholder="Write a note..." value={newNote} onChange={e=>setNewNote(e.target.value)}/>
            <select className="form-select form-input" style={{width:'auto',minWidth:120,flexShrink:0}} value={to} onChange={e=>setTo(e.target.value)}>
              <option value="all">All Family</option>
              {FAMILY.map(m=><option key={m.id} value={m.id}>{m.name.split(' ')[0]}</option>)}
            </select>
            <button className="btn btn-primary" onClick={addNote}><i className="fas fa-paper-plane"/></button>
          </div>
          <div className="notes-grid">
            {notes.map(n=>(
              <div key={n.id} className="note">
                <div style={{fontWeight:700,marginBottom:4,fontSize:'.82rem'}}>{n.author} → {n.to}</div>
                <div>{n.text}</div>
                <div style={{fontSize:'.72rem',marginTop:8,opacity:.7}}>{n.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          {/* Lost & Found */}
          <div>
            <h3 style={{marginBottom:12}}>🔍 Lost & Found</h3>
            <div className="card">
              {lostFound.map(l=>(
                <div key={l.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 14px',borderBottom:'1px solid var(--border-l)'}}>
                  <span style={{fontSize:'.87rem'}}>{l.item}</span>
                  <span className={`tag ${l.status==='found'?'tag-green':'tag-red'}`}>{l.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{marginBottom:12}}>📧 Family Newsletter</h3>
            <div className="card">
              <div className="card-body">
                {subbed?(
                  <div style={{textAlign:'center',padding:'20px 0'}}>
                    <i className="fas fa-check-circle" style={{color:'#4caf50',fontSize:'2rem',display:'block',marginBottom:8}}/>
                    <div style={{fontWeight:600}}>You're subscribed!</div>
                  </div>
                ):(
                  <>
                    <p style={{fontSize:'.85rem',color:'var(--text-m)',marginBottom:12}}>Get the monthly family newsletter delivered to your inbox.</p>
                    <input className="form-input" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} style={{marginBottom:8}}/>
                    <button className="btn btn-primary" style={{width:'100%'}} onClick={()=>email&&setSubbed(true)}>Subscribe</button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Wishlists */}
          <div>
            <h3 style={{marginBottom:12}}>🎁 Birthday Wishlist Registry</h3>
            <div className="card">
              {FAMILY.filter(f=>['grace','alvince','debra','ruth'].includes(f.id)).map(m=>(
                <div key={m.id} style={{padding:'10px 14px',borderBottom:'1px solid var(--border-l)'}}>
                  <div style={{fontWeight:600,fontSize:'.87rem'}}>{m.name.split(' ')[0]}</div>
                  <a href="https://www.amazon.com/" style={{fontSize:'.78rem',color:'var(--primary)'}}>View Wishlist (Amazon)</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────────

function GalleryPage(){
  const [images,setImages]=useState(GALLERY_IMAGES);
  const [filterYear,setFilterYear]=useState('All');
  const [filterChild,setFilterChild]=useState('All');
  const [lightbox,setLightbox]=useState(null);
  const [slideshow,setSlideshow]=useState(false);
  const toast=useToast();

  const years=[...new Set(GALLERY_IMAGES.map(i=>i.year))].sort((a,b)=>b-a);
  const filtered=images.filter(i=>(filterYear==='All'||i.year===+filterYear)&&(filterChild==='All'||i.child===filterChild||i.child==='all'));

  const shuffle=()=>{
    const s=[...images].sort(()=>Math.random()-.5);
    setImages(s);toast('Gallery shuffled! 🎲','info');
  };

  return (
    <div className="page fade-in">
      <div className="section-header">
        <div>
          <div className="page-title">Family Gallery</div>
          <p className="page-sub">Our moments in pictures</p>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button className="btn btn-outline btn-sm" onClick={shuffle}><i className="fas fa-random"/> Shuffle</button>
          <button className="btn btn-primary btn-sm" onClick={()=>toast('Upload feature coming soon!','info')}><i className="fas fa-upload"/> Upload</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap',alignItems:'center'}}>
        <select className="form-select form-input" style={{width:'auto'}} value={filterYear} onChange={e=>setFilterYear(e.target.value)}>
          <option value="All">All Years</option>
          {years.map(y=><option key={y}>{y}</option>)}
        </select>
        <select className="form-select form-input" style={{width:'auto'}} value={filterChild} onChange={e=>setFilterChild(e.target.value)}>
          <option value="All">All Members</option>
          {FAMILY.map(m=><option key={m.id} value={m.id}>{m.name.split(' ')[0]}</option>)}
        </select>
        <span style={{fontSize:'.82rem',color:'var(--text-l)'}}>{filtered.length} photos</span>
      </div>

      <div className="gallery-grid">
        {filtered.map((img,i)=>(
          <div key={img.id} className="gallery-item" onClick={()=>setLightbox(img)}>
            <img src={img.url} alt={img.event}/>
            <div className="gallery-overlay"><i className="fas fa-expand"/></div>
          </div>
        ))}
      </div>
      {filtered.length===0&&<div style={{textAlign:'center',padding:'60px',color:'var(--text-m)'}}>No photos match this filter</div>}

      {lightbox&&(
        <div className="modal-overlay" onClick={()=>setLightbox(null)}>
          <div style={{maxWidth:700,width:'100%',padding:20}}>
            <img src={lightbox.url} alt={lightbox.event} style={{width:'100%',borderRadius:16}}/>
            <div style={{color:'#fff',textAlign:'center',marginTop:12}}>
              <div style={{fontWeight:700}}>{lightbox.event} – {lightbox.year}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── KIDS ZONE ────────────────────────────────────────────────

function KidsPage(){
  const [tab,setTab]=useState('leaderboard');
  const [points,setPoints]=useState(()=>ls.get('fh_points',POINTS_INIT));
  const [kindness,setKindness]=useState('');
  const [triviaIdx,setTriviaIdx]=useState(0);
  const [triviaScore,setTriviaScore]=useState(0);
  const [answered,setAnswered]=useState(null);
  const [done,setDone]=useState(false);
  const [spinResult,setSpinResult]=useState('');
  const [spinning,setSpinning]=useState(false);
  const toast=useToast();
  const [wishlists, setWishlists] = useState(() => {
    const w = {};
    ['grace','alvince','debra','ruth'].forEach(kid => {
      w[kid] = ls.get(`fh_wish_${kid}`, ['New laptop bag','Books for reading','[Add your wish here]']);
    });
    return w;
  });
  const [newWishItems, setNewWishItems] = useState({});

  const REWARDS=[
    {id:1,name:'Extra Screen Time (1hr)',cost:15},{id:2,name:'Choose Family Dinner',cost:20},{id:3,name:'Stay Up Late (Fri)',cost:25},{id:4,name:'Special Treat / Snack',cost:10},{id:5,name:'Skip One Chore',cost:30},
  ];
  const [rewardMsg,setRewardMsg]=useState('');

  const drawKindness=()=>setKindness(KINDNESS_IDEAS[Math.floor(Math.random()*KINDNESS_IDEAS.length)]);

  const answerTrivia=(idx)=>{
    const q=TRIVIA[triviaIdx];
    setAnswered(idx);
    if(idx===q.a){setTriviaScore(s=>s+1);toast('+1 point! ✓','success');}
    else toast(`Oops! The answer was: "${q.opts[q.a]}"`, 'warning');
    setTimeout(()=>{
      if(triviaIdx<TRIVIA.length-1){setTriviaIdx(i=>i+1);setAnswered(null);}
      else setDone(true);
    },1200);
  };

  const buyReward=(r,kid)=>{
    const pts=points[kid]||0;
    if(pts<r.cost){toast('Not enough points!','warning');return;}
    const upd={...points,[kid]:pts-r.cost};
    setPoints(upd);ls.set('fh_points',upd);
    toast(`${r.name} redeemed! Ask a parent to confirm. 🎉`,'success');
  };

  const ranks=['gold','silver','bronze'];
  const sorted=Object.entries(points).sort((a,b)=>b[1]-a[1]);

  return (
    <div className="page fade-in">
      <div style={{textAlign:'center',marginBottom:24}}>
        <div style={{fontSize:'2.5rem'}}>🎮</div>
        <div className="page-title" style={{marginBottom:4}}>Kids Zone</div>
        <p className="page-sub">Earn points, play games, and redeem rewards!</p>
      </div>
      <div className="tabs">
        {[{id:'leaderboard',label:'🏆 Leaderboard'},{id:'rewards',label:'🎁 Rewards'},{id:'trivia',label:'🧠 Trivia'},{id:'kindness',label:'💛 Kindness'},{id:'wishlist',label:'⭐ Wishlist'}].map(t=>(
          <button key={t.id} className={`tab${tab===t.id?' active':''}`} onClick={()=>setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {tab==='leaderboard'&&(
        <div style={{maxWidth:500}}>
          <h3 style={{marginBottom:16}}>Points Leaderboard</h3>
          {sorted.map(([kid,pts],i)=>{
            const m=FAMILY.find(f=>f.id===kid);
            return (
              <div key={kid} className="leaderboard-item">
                <div className={`lb-rank${i<3?' '+ranks[i]:''}`}>{i+1}</div>
                <img src={m?.photo} alt={kid} style={{width:40,height:40,borderRadius:'50%'}}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700}}>{kid.charAt(0).toUpperCase()+kid.slice(1)}</div>
                  <div style={{fontSize:'.78rem',color:'var(--text-l)'}}>{m?.role}</div>
                </div>
                <div className="points-badge">⭐ {pts} pts</div>
              </div>
            );
          })}
        </div>
      )}

      {tab==='rewards'&&(
        <div>
          <h3 style={{marginBottom:4}}>Reward Store</h3>
          <p style={{color:'var(--text-m)',fontSize:'.87rem',marginBottom:20}}>Spend your hard-earned points! Parent approval required.</p>
          <div className="grid-3" style={{marginBottom:20}}>
            {REWARDS.map(r=>(
              <div key={r.id} className="card">
                <div className="card-body" style={{textAlign:'center'}}>
                  <div style={{fontSize:'2rem',marginBottom:8}}>🎁</div>
                  <div style={{fontWeight:700,marginBottom:4}}>{r.name}</div>
                  <div style={{color:'var(--primary)',fontWeight:800,fontSize:'1.1rem',marginBottom:12}}>⭐ {r.cost} pts</div>
                  {['grace','alvince','debra','ruth'].map(kid=>(
                    <button key={kid} className="btn btn-outline btn-sm" style={{width:'100%',marginBottom:4}} onClick={()=>buyReward(r,kid)}>
                      Redeem ({kid}) – {points[kid]||0}pts
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='trivia'&&(
        <div style={{maxWidth:560}}>
          {done?(
            <div style={{textAlign:'center',padding:'40px 20px',background:'var(--bg-card)',borderRadius:'var(--radius-l)',border:'1px solid var(--border)'}}>
              <div style={{fontSize:'3rem',marginBottom:12}}>🎉</div>
              <h2>Game Over!</h2>
              <p style={{fontSize:'1.2rem',fontWeight:700,color:'var(--primary)',margin:'12px 0'}}>Score: {triviaScore} / {TRIVIA.length}</p>
              <button className="btn btn-primary" onClick={()=>{setTriviaIdx(0);setTriviaScore(0);setAnswered(null);setDone(false);}}>Play Again</button>
            </div>
          ):(
            <div className="card">
              <div className="card-body">
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:16}}>
                  <span className="tag tag-teal">Q {triviaIdx+1} / {TRIVIA.length}</span>
                  <span className="tag tag-peach">Score: {triviaScore}</span>
                </div>
                <div className="progress-bar" style={{marginBottom:20}}>
                  <div className="progress-fill" style={{width:`${((triviaIdx)/TRIVIA.length)*100}%`}}/>
                </div>
                <h3 style={{marginBottom:20,fontSize:'1.05rem'}}>{TRIVIA[triviaIdx].q}</h3>
                {TRIVIA[triviaIdx].opts.map((opt,i)=>(
                  <button key={i} disabled={answered!==null}
                    className={`trivia-option${answered===i?(i===TRIVIA[triviaIdx].a?' correct':' wrong'):''}${answered!==null&&i===TRIVIA[triviaIdx].a?' correct':''}`}
                    onClick={()=>answered===null&&answerTrivia(i)}>
                    <span style={{fontWeight:700,marginRight:8}}>{String.fromCharCode(65+i)}.</span>{opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab==='kindness'&&(
        <div style={{maxWidth:500,textAlign:'center'}}>
          <div className="kindness-card" style={{marginBottom:24}}>
            <div style={{fontSize:'2rem',marginBottom:12}}>💛</div>
            <h3 style={{marginBottom:16}}>Random Act of Kindness</h3>
            {kindness?(
              <div style={{fontSize:'1.1rem',fontWeight:600,lineHeight:1.6,minHeight:60}}>{kindness}</div>
            ):(
              <div style={{color:'#7a4a00',opacity:.7}}>Click the button to get your kindness challenge!</div>
            )}
          </div>
          <button className="btn btn-primary" onClick={drawKindness}>✨ Draw a Kindness Task</button>
        </div>
      )}

      {tab==='wishlist'&&(
        <div className="grid-2">
          {['grace','alvince','debra','ruth'].map(kid=>{
            const items = wishlists[kid];
            const setItems = (newItems) => setWishlists(prev => ({...prev, [kid]: newItems}));
            const newItem = newWishItems[kid] || '';
            const setNewItem = (val) => setNewWishItems(prev => ({...prev, [kid]: val}));
            const add=()=>{
              if(!newItem.trim())return;
              const u=[...items,newItem];setItems(u);ls.set(`fh_wish_${kid}`,u);setNewItem('');
            };
            const m=FAMILY.find(f=>f.id===kid);
            return (
              <div key={kid} className="card">
                <div className="card-body">
                  <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:12}}>
                    <img src={m?.photo} alt={kid} style={{width:40,height:40,borderRadius:'50%'}}/>
                    <div style={{fontWeight:700}}>{kid.charAt(0).toUpperCase()+kid.slice(1)}'s Wishlist</div>
                  </div>
                  {items.map((item,i)=>(
                    <div key={i} style={{display:'flex',gap:8,alignItems:'center',padding:'6px 0',fontSize:'.87rem',borderBottom:'1px solid var(--border-l)'}}>
                      <i className="fas fa-star" style={{color:m?.color,fontSize:'.7rem'}}/>
                      {item}
                    </div>
                  ))}
                  <div style={{display:'flex',gap:8,marginTop:10}}>
                    <input className="form-input" placeholder="Add a wish..." value={newItem} onChange={e=>setNewItem(e.target.value)} onKeyDown={e=>e.key==='Enter'&&add()} style={{fontSize:'.82rem'}}/>
                    <button className="btn btn-primary btn-sm btn-icon" onClick={add}><i className="fas fa-plus"/></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── PARENTS CORNER ───────────────────────────────────────────

function ParentsPage(){
  const [unlocked,setUnlocked]=useState(()=>ls.get('fh_parents_open',false));
  const [pw,setPw]=useState('');
  const [tab,setTab]=useState('date');
  const [dateIdea,setDateIdea]=useState('');
  const [journal,setJournal]=useState(()=>ls.get('fh_journal',[]));
  const [newEntry,setNewEntry]=useState('');
  const toast=useToast();
  const CHECKS=['How are you feeling today, really?','What made you smile this week?','What do you need from your partner right now?','What are you most grateful for today?','How can we be better parents this week?'];
  const [checkIdx]=useState(Math.floor(Math.random()*CHECKS.length));

  const unlock=()=>{
    if(pw==='parentsonly'){setUnlocked(true);ls.set('fh_parents_open',true);toast('Welcome to Parents\' Corner 💑','success');}
    else toast('Incorrect password','warning');
  };

  const addJournal=()=>{
    if(!newEntry.trim())return;
    const e={id:Date.now(),text:newEntry,date:new Date().toLocaleDateString()};
    const upd=[e,...journal];setJournal(upd);ls.set('fh_journal',upd);
    setNewEntry('');toast('Entry saved ✓','success');
  };

  if(!unlocked){
    return (
      <div className="page page-sm fade-in">
        <div className="lock-screen">
          <div className="lock-icon"><i className="fas fa-heart"/></div>
          <h2>Parents' Corner</h2>
          <p style={{color:'var(--text-m)',margin:'12px auto 24px',maxWidth:400}}>A private space just for Tobias & Eunice. Please enter the parent password to continue.</p>
          <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
            <input type="password" className="form-input" style={{maxWidth:240}} placeholder="Parent password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&unlock()}/>
            <button className="btn btn-primary" onClick={unlock}>Enter</button>
          </div>
          <p style={{fontSize:'.78rem',color:'var(--text-l)',marginTop:12}}>Demo password: parentsonly</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4,flexWrap:'wrap',gap:8}}>
        <div className="page-title">Parents' Corner 💑</div>
        <button className="btn btn-outline btn-sm" onClick={()=>{setUnlocked(false);ls.set('fh_parents_open',false);}}>Lock</button>
      </div>
      <p className="page-sub">Your private space, Tobias & Eunice</p>
      <div className="tabs">
        {[{id:'date',label:'❤️ Date Nights'},{id:'journal',label:'📔 Journal'},{id:'checkin',label:'✅ Check-In'},{id:'estate',label:'📋 Planning'},{id:'budget',label:'💰 Full Budget'}].map(t=>(
          <button key={t.id} className={`tab${tab===t.id?' active':''}`} onClick={()=>setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {tab==='date'&&(
        <div style={{maxWidth:500}}>
          <h3 style={{marginBottom:16}}>Date Night Ideas</h3>
          <div style={{textAlign:'center',marginBottom:24}}>
            <div style={{background:'linear-gradient(135deg,var(--pink),var(--peach))',borderRadius:'var(--radius-l)',padding:'32px 20px',marginBottom:16,minHeight:120,display:'flex',alignItems:'center',justifyContent:'center'}}>
              {dateIdea?(
                <div style={{fontSize:'1.2rem',fontWeight:700,color:'#5a2040'}}>{dateIdea}</div>
              ):(
                <div style={{color:'#9b6a80',fontStyle:'italic'}}>Click spin to get a date idea!</div>
              )}
            </div>
            <button className="btn btn-primary" onClick={()=>setDateIdea(DATE_IDEAS[Math.floor(Math.random()*DATE_IDEAS.length)])}>
              🎲 Spin for an Idea
            </button>
          </div>
          <h4 style={{marginBottom:12}}>All Ideas</h4>
          {DATE_IDEAS.map((d,i)=>(
            <div key={i} style={{padding:'10px 14px',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:10,marginBottom:8,fontSize:'.9rem',cursor:'pointer'}} onClick={()=>setDateIdea(d)}>
              {d}
            </div>
          ))}
        </div>
      )}

      {tab==='journal'&&(
        <div style={{maxWidth:600}}>
          <div className="info-box"><i className="fas fa-lock"/> <strong>Encrypted on server</strong> – Journal entries are private and secure.</div>
          <textarea className="form-input" placeholder="Write a private journal entry..." value={newEntry} onChange={e=>setNewEntry(e.target.value)} style={{marginBottom:8,minHeight:120}}/>
          <button className="btn btn-primary" style={{marginBottom:24}} onClick={addJournal}>Save Entry</button>
          {journal.map(e=>(
            <div key={e.id} style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:10,padding:'14px 16px',marginBottom:12}}>
              <div style={{fontSize:'.75rem',color:'var(--text-l)',marginBottom:8}}>{e.date}</div>
              <div style={{fontSize:'.9rem',color:'var(--text-m)'}}>{e.text}</div>
            </div>
          ))}
          {journal.length===0&&<div style={{color:'var(--text-l)',fontStyle:'italic'}}>No entries yet. Start your first journal entry above.</div>}
        </div>
      )}

      {tab==='checkin'&&(
        <div style={{maxWidth:500}}>
          <div className="card">
            <div className="card-body" style={{textAlign:'center'}}>
              <div style={{fontSize:'2rem',marginBottom:12}}>💬</div>
              <h3 style={{marginBottom:8}}>Daily Marriage Check-In</h3>
              <p style={{color:'var(--text-m)',fontSize:'.87rem',marginBottom:20}}>A question to help you stay connected</p>
              <div style={{background:'linear-gradient(135deg,rgba(44,105,117,.08),rgba(224,177,203,.12))',borderRadius:12,padding:24,fontSize:'1.1rem',fontWeight:600,lineHeight:1.6,color:'var(--text)',marginBottom:20}}>
                "{CHECKS[checkIdx]}"
              </div>
              <textarea className="form-input" placeholder="Your answer..." style={{marginBottom:8}}/>
              <button className="btn btn-primary" style={{width:'100%'}}>Save Response</button>
            </div>
          </div>
        </div>
      )}

      {tab==='estate'&&(
        <div style={{maxWidth:600}}>
          <h3 style={{marginBottom:16}}>Estate & Future Planning</h3>
          <div className="info-box"><i className="fas fa-shield-alt"/> This section is for planning notes only. No real documents are stored here.</div>
          {['Will & Testament : attorney name : Mr. John Kimani','Land / Property Details ','Life Insurance Policy ','Children\'s Education Fund ','Emergency Contacts & Arrangements '].map(i=>(
            <div key={i} style={{padding:'12px 16px',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:10,marginBottom:8,fontSize:'.9rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span>{i}</span>
              <div className="encrypted-badge"><i className="fas fa-lock"/> Secure</div>
            </div>
          ))}
        </div>
      )}

      {tab==='budget'&&<BudgetTab role="parent"/>}
    </div>
  );
}

// ─── HELP PAGE ────────────────────────────────────────────────

function HelpPage(){
  const [open,setOpen]=useState(null);
  return (
    <div className="page page-sm fade-in">
      <div className="page-title">Help & FAQ</div>
      <p className="page-sub">Answers to common questions about the Family Hub</p>
      <div style={{marginBottom:40}}>
        {FAQS.map((faq,i)=>(
          <div key={i} style={{border:'1px solid var(--border)',borderRadius:12,marginBottom:8,overflow:'hidden'}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:'100%',padding:'16px 20px',border:'none',background:'var(--bg-card)',color:'var(--text)',textAlign:'left',fontFamily:'Poppins',fontWeight:600,fontSize:'.92rem',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              {faq.q}<i className={`fas fa-chevron-${open===i?'up':'down'}`} style={{color:'var(--primary)'}}/>
            </button>
            {open===i&&(
              <div style={{padding:'0 20px 16px',fontSize:'.88rem',color:'var(--text-m)',lineHeight:1.7,borderTop:'1px solid var(--border)'}}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
      <h2 style={{marginBottom:16}}>Contact Directory</h2>
      <div className="grid-2">
        {CONTACTS.map(c=>(
          <div key={c.name} className="card">
            <div className="card-body" style={{display:'flex',gap:16,alignItems:'center'}}>
              <div style={{width:48,height:48,borderRadius:'50%',background:'rgba(44,105,117,.1)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--primary)',fontSize:'1.2rem',flexShrink:0}}>
                <i className={`fas ${c.icon}`}/>
              </div>
              <div>
                <div style={{fontWeight:700}}>{c.name}</div>
                <div style={{fontSize:'.82rem',color:'var(--text-m)'}}>{c.area}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:32,padding:'20px 24px',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--radius-l)'}}>
        <h3 style={{marginBottom:8}}>Password Reset</h3>
        <p style={{fontSize:'.87rem',color:'var(--text-m)',lineHeight:1.7}}>
          <strong>Family documents:</strong> family123<br/>
          <strong>Parents' Corner:</strong> parentsonly<br/>
          <em style={{opacity:.7}}>In a live deployment, contact your site administrator to reset passwords.</em>
        </p>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────

function App(){
  const [page,setPage]=useState('home');
  const [role,setRole]=useState(()=>ls.get('fh_role','public'));
  const [dark,setDark]=useState(()=>ls.get('fh_dark',false));

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme',dark?'dark':'light');
    ls.set('fh_dark',dark);
  },[dark]);

  const PRIVATE=['calendar','household','school','library','messages','kids'];
  const PARENT_ONLY=['parents'];

  const guard=(comp,requiredRoles)=>{
    if(!requiredRoles.includes(role)){
      return (
        <div className="page page-sm fade-in">
          <div className="lock-screen">
            <div className="lock-icon"><i className="fas fa-lock"/></div>
            <h2>Access Restricted</h2>
            <p style={{color:'var(--text-m)',margin:'12px 0 24px'}}>This section is only available to {requiredRoles.join(', ')} users. Use the role switcher in the navigation to change your view.</p>
            <button className="btn btn-primary" onClick={()=>setPage('home')}>Go Home</button>
          </div>
        </div>
      );
    }
    return comp;
  };

  const pages = {
    home: <HomePage role={role} setPage={setPage}/>,
    about: <AboutPage setPage={setPage}/>,
    calendar: guard(<CalendarPage role={role}/>, ['extended','kid','parent']),
    blog: <BlogPage role={role}/>,
    household: guard(<HouseholdPage role={role}/>, ['extended','kid','parent']),
    school: guard(<SchoolPage role={role}/>, ['extended','kid','parent']),
    library: guard(<LibraryPage role={role}/>, ['extended','kid','parent']),
    travel: <TravelPage/>,
    messages: guard(<MessagesPage/>, ['extended','kid','parent']),
    gallery: <GalleryPage/>,
    kids: guard(<KidsPage/>, ['kid','parent']),
    parents: guard(<ParentsPage/>, ['parent']),
    help: <HelpPage/>,
  };

  return (
    <ToastProvider>
      <Nav page={page} setPage={setPage} role={role} setRole={setRole} dark={dark} setDark={setDark}/>
      <main className="main">
        {pages[page] || pages['home']}
      </main>
      <footer style={{textAlign:'center',padding:'24px',borderTop:'1px solid var(--border)',color:'var(--text-l)',fontSize:'.8rem',marginTop:40}}>
        <div>The Okelo's Family Hub • Built with ❤️ • All family data stays on your device</div>
        <div style={{marginTop:4}}>
          Role: <strong>{role}</strong> •
          <button onClick={()=>setDark(!dark)} style={{border:'none',background:'none',color:'var(--primary)',cursor:'pointer',fontFamily:'Poppins',fontWeight:600,marginLeft:4}}>
            {dark?'🌞 Light Mode':'🌙 Dark Mode'}
          </button>
        </div>
      </footer>
    </ToastProvider>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
