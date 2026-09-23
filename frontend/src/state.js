/* HerHorizon shared application state and DOM helpers. */
const S = {
  val:'0', seq:'', code: localStorage.getItem('herhorizon_stealth_code') || '98.6+=',
  coords:{lat:19.250904,lng:73.142782,acc:25}, hasGPS:false, watchId:null,
  corridor:'safe', simOn:false, simStep:0, simTimer:null, sirenOn:false, actx:null, osc:null,
  map:null, userMarker:null, accCircle:null, layers:{safe:null,direct:null}, shelterGroup:null, guardGroup:null,
  scope:'available', tag:'all',
  shelters:[
    {id:1,name:"Emergency Refugee Sanctuary",area:"Central Dadar",address:"Central Transit Corridor · 24/7 priority intake",beds:5,familyUnits:3,sec:"Armed kiosk & CCTV",far:false,dLat:.0032,dLng:-.0016,tags:["women","kids","accessible"]},
    {id:2,name:"Sakha Protect Haven",area:"Colaba",address:"Maritime enclave Sector 4 · 24/7 intake",beds:2,familyUnits:1,sec:"Verified CCTV & escort",far:false,dLat:.0018,dLng:.0045,tags:["women","pets","accessible"]},
    {id:3,name:"St. Jude Sanctuary Point",area:"Transit Riverline",address:"Riverline Station · 24/7 intake",beds:9,familyUnits:4,sec:"Perimeter patrol",far:false,dLat:.0055,dLng:-.0028,tags:["women","kids","pets","accessible"]},
    {id:4,name:"Sakhi One-Stop Shelter",area:"Precinct Sector 3",address:"Municipal precinct Sector 3",beds:0,familyUnits:0,sec:"24/7 monitored node",far:false,dLat:-.0042,dLng:.0062,tags:["women","accessible"]},
    {id:5,name:"Harbor Sanctuary Point",area:"Northern Coast · Farther",address:"Outer highway safe station",beds:14,familyUnits:6,sec:"Armed perimeter",far:true,dLat:.031,dLng:.024,tags:["women","kids","pets","accessible"]},
    {id:6,name:"West Highland Refuge",area:"Western Foothills · Farther",address:"Regional sanctuary Sector 9",beds:8,familyUnits:5,sec:"State police node",far:true,dLat:-.028,dLng:-.031,tags:["women","kids","accessible"]}
  ],
  guardians:[
    {init:"ML",name:"Maya Lin",rel:"Sister",phone:"+1 (555) 349-2918",status:"Active now",color:"#ede9fe,#6d28d9"},
    {init:"EV",name:"Elena Vance",rel:"Advocate",phone:"+1 (555) 782-9011",status:"Online",color:"#ede9fe,#6d28d9"},
    {init:"CP",name:"City Safe Patrol Desk",rel:"Escort unit",phone:"+1 (802) 555-0100",status:"Standby",color:"#e0f2fe,#0369a1"}
  ]
};
const $=id=>document.getElementById(id);
const toast=m=>{const t=$('portalToast');t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2800);};
