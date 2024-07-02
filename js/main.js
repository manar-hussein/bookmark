var siteName =document.getElementById("siteName");
var siteUrl =document.getElementById("siteUrl");
var sitesList=[];
if(localStorage.getItem("siteList") != null)
{
   sitesList = JSON.parse(localStorage.getItem("siteList"));
   disPlay(sitesList);
};
function addWebSite ()
{
   if(nameValidation())
   {
       var site ={
          siteName:siteName.value,
          siteUrl:siteUrl.value,
    }
       if(test(site.siteUrl)){sitesList.push(site);
         localStorage.setItem("siteList",JSON.stringify(sitesList));
         disPlay(sitesList);
        clearForm()
          document.querySelector(".validationRule").classList.add("d-none"); 
       }else{document.querySelector(".validationRule").classList.remove("d-none");}
       
   }else{
      document.querySelector(".validationRule").classList.remove("d-none");
   };
   
   
   
};
document.querySelector(".userArea button").addEventListener("click",function(){addWebSite()});
function clearForm()
{
   siteName.value='';
   siteUrl.value='';
};
function disPlay (arr)
{
   var sitesBox='';
   for(var i=0;i<arr.length;i++)
   {
      sitesBox +=`

      <tr>
      <th>${i+1}</th>
      <td>${arr[i].newName?arr[i].newName:arr[i].siteName}</td>
      <td><a id="visitBtn" href="${sitesList[i].siteUrl}" target="blank" class="btn btn-light px-3"><span><i class="fa-solid fa-eye text-white fa-xs me-1"></i></span>  Visit</a></td>
      <td><button id="deleteBtn" onclick="deleteItem(sitesList,${i})" class="btn btn-info px-3"><span><i class="fa-solid fa-trash-can fa-xs text-white"></i></span>  Delete</button></td>
    </tr>
      `
   }
   document.querySelector(".disPlay table tbody").innerHTML=sitesBox;
};
function deleteItem (arr , index)
{
    arr.splice(index,1)

    localStorage.setItem("siteList",JSON.stringify(arr));
    disPlay(arr);
};
function search (term)
{
   var searchArr =[];
   for(var i=0;i<sitesList.length;i++){

      if(sitesList[i].siteName.toLowerCase().includes(term.toLowerCase())){
         sitesList[i].newName=sitesList[i].siteName.toLowerCase().replace(term.toLowerCase(),`<span class="text-danger">${term}</span>`);
         searchArr.push(sitesList[i])
      }
   }
   disPlay(searchArr);
};
document.querySelector("#search").addEventListener("input",function(){search(this.value)});
function nameValidation ()
{
    var regex =/^[A-Z][a-zA-Z]{3,}/
    if(regex.test(siteName.value)){
      siteName.style.border=("none");
      return true;
    }else{
      siteName.style.border="5px red solid";
      return false;
    }
};
document.querySelector("#siteName").addEventListener("input",function(){nameValidation()});
document.querySelector(".closebtn").addEventListener("click",function(){document.querySelector(".validationRule").classList.add("d-none")});

// function urlValidation ()
// {
//    var regex=/^[(www.)(WWW.)(http://)(https://)(ftp://)]?.+(.com)?/;
//      siteUrl.style.border="none";
//    if(regex.test(siteUrl.value)){
      
//       return true;
//    }else{
//       siteUrl.style.border="red 5px solid";
//       return false;
//    }
// };
function Validation (i){
   if(nameValidation() && test(testURL)){
      return true;
   }else{
      return false
   }
};

function test (testURL)
{
   try {
      var testURL =new URL(testURL);
      siteUrl.style.border="none";
      return true;
   } catch (error) {
      siteUrl.style.border="red 5px solid";
      return false; 
   }
};




















