(function(){
var toastEl=document.getElementById("toast");
function toast(m){toastEl.textContent=m;toastEl.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(function(){toastEl.classList.remove("show")},1800)}
function copy(t){function fb(){var a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();var ok=false;try{ok=document.execCommand("copy")}catch(e){}document.body.removeChild(a);toast(ok?"Prompt copiado":"No se pudo copiar. Selecciona el texto a mano.")}
try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){toast("Prompt copiado")},fb)}else fb()}catch(e){fb()}}
var app="Todos",q="";
function apply(){var cards=document.querySelectorAll("#plist .card");if(!cards.length)return;var n=0,s=q.trim().toLowerCase();
cards.forEach(function(c){var ok=(app==="Todos"||c.getAttribute("data-app")===app)&&(!s||c.getAttribute("data-search").indexOf(s)!==-1);c.hidden=!ok;if(ok)n++});
var ct=document.getElementById("count");if(ct)ct.textContent=n+(n===1?" prompt":" prompts");var no=document.getElementById("none");if(no)no.hidden=n>0;
document.querySelectorAll("[data-filter]").forEach(function(b){b.setAttribute("aria-pressed",String(b.getAttribute("data-filter")===app))})}
document.addEventListener("click",function(e){var c=e.target.closest("[data-copy]");if(c){var box=c.closest(".card").querySelector(".prompt-box");if(box)copy(box.textContent);return}
var f=e.target.closest("[data-filter]");if(f){app=f.getAttribute("data-filter");apply()}});
document.addEventListener("input",function(e){if(e.target&&e.target.id==="q"){q=e.target.value;apply()}});
var m=/[?&]app=([^&]+)/.exec(location.search);if(m){app=decodeURIComponent(m[1]);apply()}
})();
