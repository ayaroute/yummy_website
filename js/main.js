
let width = $(".nav-link").outerWidth(true)

$("nav").css({ left: `-${width}px` })

$(".open").click(function () {
    let leftNav= $("nav").css("left")

    if (leftNav == "0px") {
        $("nav").animate({ left: `-${width}px` }, 500)
        $(".links li").animate({
            top: 300
        }, 500)
    }
    else {
        $("nav").animate({ left: `0px` }, 500)
        for (let i = 0; i < 5; i++) {
            $(".links li").eq(i).animate({
                top: 0
            }, (i + 5) * 100)
        }

    }
})

$(".close-Instructions").click(() => {
    $(".Instructions").addClass("d-none")
    $(".meals").removeClass("d-none")
});


async function GetData() {
    $(document).ready(async function () {
        $(".loading-screen").fadeIn(500)
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        res = await res.json()
        res = res.meals
        DisplayMeals(res)
        $(".DMeal").click(function () {
            let id = $(this).attr("idmeal")
            GetInstruction(id);
        })
        $(".loading-screen").fadeOut(500)
    })

}
GetData()
function DisplayMeals(res) {
    temp = "";
    res.forEach((el) => {
        temp += `
       
                <div class="col-lg-3 col-md-4 col-sm-6 DMeal" idmeal="${el.idMeal}">
                    <div class="image position-relative  rounded-3 overflow-hidden">
                        <img src="${el.strMealThumb}" class="w-100" alt="">
                        <div class="overLay p-2 d-flex align-items-center">
                            <h2>${el.strMeal}</h2>
                        </div>
                    </div>
                </div>
       `
    })
    temp = `
    <div class="container">
<div class="row  g-4 text-center">
${temp}
</div>
</div>
    
    `
    $(".meals").html(temp)
}
async function GetInstruction(id) {

    $(".loading-screen").fadeIn(500)
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    res = await res.json()
    res = res.meals[0]
    $(".Instructions").removeClass("d-none")
    $(".meals").addClass("d-none")
    displayInstraction(res)
    $(".loading-screen").fadeOut(500)

}
function displayInstraction(res) {
    let Recipes = ""
    for (let i = 1; i <= 20; i++) {

        if (res[`strIngredient${i}`] != "") {
            Recipes += `<li class="alert alert-info m-2 p-2">${res[`strMeasure${i}`]} ${res[`strIngredient${i}`]}</li>`
        }
    }
    let tags = ""
    let tempTag = ""
    if (res.strTags == null) {
        tags = ""
    }
    else {
        Tags = res.strTags.split(",")

        Tags.forEach((el) => {
            tempTag += `<li class="alert alert-danger m-2 p-1">${el}</li>`
        })
    }


    let temp = `
       <div class="col-md-4">
                    <img src="${res.strMealThumb}" class="w-100 rounded-4" alt="">
                    <h2 class="text-white mt-2">${res.strMeal}</h2>

                </div>
                <div class="col-md-8 text-white">
                    <h2>Instructions</h2>
                    <p>${res.strInstructions}</p>
                    <h3>Area : ${res.strArea}</h3>
                    <h3>Category : ${res.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-5 flex-wrap">
                       ${Recipes}
                    </ul>
                    <h3>Tags:</h3>
                    <ul class="list-unstyled d-flex g-5">
                        ${tempTag}
                    </ul>
                    <button  class="btn btn-success Meal-src">Source</button>
                    <button  class="btn btn-danger Meal-Youtube">Youtube</button>
                </div>
            
       `
    $(".Instructions .container .row").html(temp)
    $(".Meal-src").click(function () {
        window.open(res.strSource)
    })
    $(".Meal-Youtube").click((el) => {
        window.open(res.strYoutube)
    })

}
$("#Categories").click(getCategories)

async function getCategories() {
    $(".contact").addClass("d-none")
    $(".loading-screen").fadeIn(500)
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    res = await res.json()
    res = res.categories
    DisplayCategories(res)
    $(".Categ").click(function () {
        let categ = $(this).attr("strCat")
        getCategoriesMeals(categ)

    })
    $(".loading-screen").fadeOut(500)
}

function DisplayCategories(res) {
    let temp = ""

    res.forEach((el) => {

        temp += `
       
        <div class="col-lg-3 col-md-4 col-sm-6 Categ" strCat="${el.strCategory}">
        <div class="image position-relative  rounded-3 overflow-hidden">
            <img src="${el.strCategoryThumb}" class="w-100" alt="">
            <div class="overLay d-flex text-center align-items-center pt-4">
                <div>
                    <h2>${el.strCategory}</h2>
                <p>${el.strCategoryDescription.split(" ").slice(0, 15).join(" ")}</p>
                </div>
            </div>
        </div>
    </div>
       
        `
    })
    temp = `
    <div class="container">
<div class="row  g-4 text-center">
${temp}
</div>
</div>
    
    `
    $(".meals").html(temp)
}

async function getCategoriesMeals(categ) {
    $(".loading-screen").fadeIn(500)
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`)
    res = await res.json()
    res = res.meals
    DisplayCategoriesMeals(res)
    $(".loading-screen").fadeOut(500)
}

function DisplayCategoriesMeals(res) {

    temp = "";

    for (let i = 0; i < res.length; i++) {
        if (i < 20) {
            temp += `
       
        <div class="col-lg-3 col-md-4 col-sm-6 DcategM" idmeal="${res[i].idMeal}">
            <div class="image position-relative  rounded-3 overflow-hidden">
                <img src="${res[i].strMealThumb}" class="w-100" alt="">
                <div class="overLay p-2 d-flex align-items-center">
                    <h2>${res[i].strMeal}</h2>
                </div>
            </div>
        </div>
`
        }
        else {
            break
        }
    }
    temp = `
    <div class="container">
<div class="row  g-4 text-center">
${temp}
</div>
</div>
    
    `
    $(".meals").html(temp)
    $(".DcategM").click(function () {
        let id = $(this).attr("idmeal")
        GetInstruction(id);
    })
}

$("#Area").click(GetAreaList)
async function GetAreaList() {
    $(document).ready(async function () {
        $(".loading-screen").fadeIn(500)
        $(".contact").addClass("d-none")
        let res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        res = await res.json();
        res = res.meals
        displayArea(res)
        $(".Area").click(function () {
            let Area = $(this).attr("StrArea")

            getAreaMeal(Area)
        })
        $(".loading-screen").fadeOut(500)
    })

}

function displayArea(res) {
    let temp = ""
    res.forEach((el) => {

        temp += `
       
        <div class="col-lg-3 col-md-4 col-sm-6 Area" StrArea="${el.strArea}">
        <div class="Icon text-white ">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${el.strArea}</h3>
            
        </div>
       </div>
        `
    })
    temp = `
    <div class="container">
<div class="row  g-4 text-center">
${temp}
</div>
</div>
    
    `
    $(".meals").html(temp)

}
async function getAreaMeal(Area) {
    $(document).ready(async function () {
        $(".loading-screen").fadeIn(500)
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
        res = await res.json()
        res = res.meals
        DisplayMeals(res.slice(0, 20))
        $(".DMeal").click(function () {
            let id = $(this).attr("idmeal")
            GetInstruction(id);
        })
        $(".loading-screen").fadeOut(500)
    })
}
$("#Ingredients").click(getIngrediant)
async function getIngrediant() {
    $(document).ready(async function () {
        $(".loading-screen").fadeIn(500)
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        res = await res.json()
        res = res.meals
        DisplayIngrediant(res.slice(0, 20))
        $(".Ingrediant").click(function () {
            let Ingredient = $(this).attr("strIngredi")
            getIngrediantMeals(Ingredient.split(" ").join("_"))
        })
        $(".loading-screen").fadeOut(500)
    })
}
function DisplayIngrediant(res) {
    let temp = ""
    res.forEach((el) => {

        temp += `
       
        <div class="col-lg-3 col-md-4 col-sm-6 Ingrediant" strIngredi="${el.strIngredient}">
                <div class="Icon text-white text-center">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${el.strIngredient}</h3>
                    <p>${el.strDescription.split(" ").slice(0, 25).join(" ")}</p>
                    
                </div>
            </div>
        `
    })
    temp = `
        <div class="container">
    <div class="row  g-4 text-center">
    ${temp}
    </div>
</div>
        
        `
    $(".meals").html(temp)
}

async function getIngrediantMeals(Ingredient) {
    $(document).ready(async function () {
        $(".loading-screen").fadeIn(500)
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
        res = await res.json()
        console.log(res)
        res = res.meals
        DisplayMeals(res.slice(0, 20))
        $(".DMeal").click(function () {
            let id = $(this).attr("idmeal")
            GetInstruction(id);
        })
        $(".loading-screen").fadeOut(500)
    })
}
$(".nav-item").click((el) => {
    $(".Instructions").addClass("d-none")
    $(".meals").removeClass("d-none")
    $(".Search-container").addClass("d-none")
    let leftx = $("nav").css("left")

    if (leftx == "0px") {
        $("nav").animate({ left: `-${width}px` }, 500)
        $(".links li").animate({
            top: 300
        }, 500)
    }
    $(".open").toggleClass("fa-bars fa-x")
})

$("#Contact_Us").click(() => {
    let temp = ""

    temp = `
    <div class="contact d-flex justify-content-center align-items-center vh-100 ">
    <div class="container  text-center">
        <div class="row">
           
                <div class="col-md-6">
                <div>
                    <input type="text" id="nameInput" class="form-control w-100 mt-3" placeholder="Enter Your Name">
                    <p class="alert alert-danger mt-2 d-none">Special characters and numbers not allowed</p>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <input type="text" id="EmailInput" class="form-control w-100 mt-3" placeholder="Enter Your Email">
                    <p class="alert alert-danger mt-2 d-none">Email not valid *exemple@yyy.zzz</p>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <input type="number" id="PhoneInput" class="form-control w-100 mt-3" placeholder="Enter Your Phone">
                    <p class="alert alert-danger mt-2 d-none">Enter valid Phone Number</p>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <input type="number" id="AgeInput" class="form-control w-100 mt-3" placeholder="Enter Your Age">
                    <p class="alert alert-danger mt-2 d-none">Enter valid age</p>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <input type="password" id="PassInput" class="form-control w-100 mt-3" placeholder="Enter Your password">
                    <p class="alert alert-danger mt-2 d-none">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <input type="password" id="RePassInput" class="form-control w-100 mt-3" placeholder="Repassword">
                    <p class="alert alert-danger mt-2 d-none">Enter valid repassword</p>
                </div>
            </div>
        </div>
        <button class="btn btn-danger mt-4 SubmitButton" disabled>Submit</button>
        
    </div>
    
</div>
        `
    $(".meals").html(temp)
    Check(AllInputtrue)
})

function Check(AllInputtrue) {
    let nameInput = document.getElementById("nameInput")
    let EmailInput = document.getElementById("EmailInput")
    let PhoneInput = document.getElementById("PhoneInput")
    let AgeInput = document.getElementById("AgeInput")
    let PassInput = document.getElementById("PassInput")
    let RePassInput = document.getElementById("RePassInput")
    nameInput.addEventListener("keyup", () => {
        if (CheckName(nameInput.value) == true) {
            $(nameInput).addClass("is-valid")
            $(nameInput).removeClass("is-invalid")
            $(nameInput).parents().children("p").addClass("d-none")
        } else {
            $(nameInput).addClass("is-invalid")
            $(nameInput).removeClass("is-valid")
            $(nameInput).parents().children("p").removeClass("d-none")
        }
        AllInputtrue()
    })
    EmailInput.addEventListener("keyup", () => {
        if (CheckEmail(EmailInput.value) == true) {
            $(EmailInput).addClass("is-valid")
            $(EmailInput).removeClass("is-invalid")
            $(EmailInput).parents().children("p").addClass("d-none")
        } else {
            $(EmailInput).addClass("is-invalid")
            $(EmailInput).removeClass("is-valid")
            $(EmailInput).parents().children("p").removeClass("d-none")
        }
        AllInputtrue()
    })
    PhoneInput.addEventListener("keyup", () => {
        if (CheckPhone(PhoneInput.value) == true) {
            $(PhoneInput).addClass("is-valid")
            $(PhoneInput).removeClass("is-invalid")
            $(PhoneInput).parents().children("p").addClass("d-none")
        } else {
            $(PhoneInput).addClass("is-invalid")
            $(PhoneInput).removeClass("is-valid")
            $(PhoneInput).parents().children("p").removeClass("d-none")
        }
        AllInputtrue()
    })
    AgeInput.addEventListener("keyup", () => {
        if (CheckAge(AgeInput.value) == true) {
            $(AgeInput).addClass("is-valid")
            $(AgeInput).removeClass("is-invalid")
            $(AgeInput).parents().children("p").addClass("d-none")
        } else {
            $(AgeInput).addClass("is-invalid")
            $(AgeInput).removeClass("is-valid")
            $(AgeInput).parents().children("p").removeClass("d-none")
        }
        AllInputtrue()
    })
    PassInput.addEventListener("keyup", () => {
        if (CheckPass(PassInput.value) == true) {
            $(PassInput).addClass("is-valid")
            $(PassInput).removeClass("is-invalid")
            $(PassInput).parents().children("p").addClass("d-none")
        } else {
            $(PassInput).addClass("is-invalid")
            $(PassInput).removeClass("is-valid")
            $(PassInput).parents().children("p").removeClass("d-none")
        }
        AllInputtrue()
    })
    RePassInput.addEventListener("keyup", () => {
        if (RePassInput.value == PassInput.value) {
            $(RePassInput).addClass("is-valid")
            $(RePassInput).removeClass("is-invalid")
            $(RePassInput).parents().children("p").addClass("d-none")

        }
        else {
            $(RePassInput).addClass("is-invalid")
            $(RePassInput).removeClass("is-valid")
            $(RePassInput).parents().children("p").removeClass("d-none")

        }
        AllInputtrue()
    })


}
function CheckName(nameInput) {
    return /^[a-zA-z ]{3,20}$/.test(nameInput)
}
function CheckEmail(EmailInput) {
    return /^[a-z0-9A-Z-\._]{4,20}@[A-Za-z]{3,10}.[a-zA-Z]{3,6}$/.test(EmailInput)
}
function CheckPhone(nameInput) {
    return /^(011|012|015|010)[0-9]{8}$/.test(nameInput)
}
function CheckAge(AgeInput) {
    return /^[0-9]{1,2}$/.test(AgeInput)
}
function CheckPass(PassInput) {
    return /^[a-zA-Z0-9@-_$%#@!*.]{8,15}$/.test(PassInput)
}

function AllInputtrue() {
    if (CheckName(nameInput.value) == true && CheckEmail(EmailInput.value) == true && CheckPhone(PhoneInput.value) == true && CheckAge(AgeInput.value) == true && CheckPass(PassInput.value) == true && RePassInput.value == PassInput.value) {
        $(".SubmitButton").removeAttr("disabled")
    }
    else {
        $(".SubmitButton").attr("disabled", "disabled")
    }
}

$("#Search").click(() => {
    $(".meals").html("")
    $(".Search-container").removeClass("d-none")
    $("html,body").animate({ scrollTop: 0 }, 300)
    let temp = ""

    temp = `

    <div class="container">
    <div class="row ">
    <div class="col-md-6">
    <input type="text" id="SearchName" class="form-control bg-transparent w-100 mb-3" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
    <input type="text" id="SearchLetter" class="form-control bg-transparent w-100 " placeholder="Search By Fist Letter">
    </div>
    </div>
            
            
            <i class="fa-solid fa-x close-search fa-2x text-white"></i>
    </div>
    <div class="meals2">
            
            </div>
        `
    $(".Search-container").html(temp)
    $(".close-search").click(() => {
        GetData()
        $(".Search-container").addClass("d-none")

    });
    GetSearch()

})
function GetSearch() {
    let SearchName = document.getElementById("SearchName")
    let SearchLetter = document.getElementById("SearchLetter")
    SearchName.addEventListener("keyup", () => {
        SearchByName(SearchName.value)
    })
    SearchLetter.addEventListener("keyup", () => {
        SearchByLetter(SearchLetter.value)
    })

}

async function SearchByName(x) {
   
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`);
        res = await res.json();
        res = res.meals;
        DisplaySearchByName(res)
     
}
function DisplaySearchByName(res) {
    temp = "";
    for (let i = 0; i < res.length; i++) {
        if (i < 20) {
            temp += `
       
        <div class="col-lg-3 col-md-4 col-sm-6 SearchNam" idmeal="${res[i].idMeal}">
            <div class="image position-relative  rounded-3 overflow-hidden">
                <img src="${res[i].strMealThumb}" class="w-100" alt="">
                <div class="overLay p-2 d-flex align-items-center">
                    <h2>${res[i].strMeal}</h2>
                </div>
            </div>
        </div>
    `
        }
        else {
            break
        }
    }
    temp = `
    <div class="container">
<div class="row  g-4 text-center">
${temp}
</div>
</div>
    
    `
    $(".meals2").html(temp)
    $(".SearchNam").click(function () {
        let id = $(this).attr("idmeal")
        $(".Search-container").addClass("d-none")
        GetInstruction(id);
    })
}

async function SearchByLetter(x) {

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${x}`)
    res = await res.json()
    res = res.meals
    DisplaySearchByletter(res)
}
function DisplaySearchByletter(res) {
    // $(".loading-screen").fadeIn(500).fadeOut(500)
    temp = "";
    for (let i = 0; i < res.length; i++) {
        if (i < 20) {
            temp += `
       
        <div class="col-lg-3 col-md-4 col-sm-6 SearchLett" idmeal="${res[i].idMeal}">
            <div class="image position-relative  rounded-3 overflow-hidden">
                <img src="${res[i].strMealThumb}" class="w-100" alt="">
                <div class="overLay p-2 d-flex align-items-center">
                    <h2>${res[i].strMeal}</h2>
                </div>
            </div>
        </div>
    `
        }
        else {
            break
        }
    }
    temp = `
    <div class="container">
<div class="row  g-4 text-center">
${temp}
</div>
</div>
    
    `
    $(".meals2").html(temp)
    $(".SearchLett").click(function () {
        let id = $(this).attr("idmeal")
        $(".Search-container").addClass("d-none")
        GetInstruction(id);
    })
}
$("#Home").click(()=>{
    GetData()
    $(".Search-container").addClass("d-none")
    $(".Instructions").addClass("d-none")
})

console.log($(".Navbarx").outerWidth(true))
$(".Navbarx").outerWidth(true)

document.addEventListener("click",()=>{
    let leftx = $("nav").css("left")
    let width=$("navHeader").css("left")
    if (leftx == "0px") {
        $(".loading-screen").animate({ left: `${width}px` }, 500)
    }
    else {
        let width=$(".navHeader").outerWidth(true)
        $(".loading-screen").css({left:`${width}px`})
    }
})






