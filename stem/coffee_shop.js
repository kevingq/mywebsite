var coffeeCount = 0
var cupCount = 0
var fundsCount = 100.00
var coffeePrice = 8
var coffeeCost = 3//Math.floor(2*Math.random())+Math.floor(2*Math.random())/2+2
var cupCost = 2//Math.floor(2*Math.random())+Math.floor(2*Math.random())/2+1
var propertyCost = 20
var priceData = []
var revenueData = []
var profitData = []
var customerRatioData = []
var dayProfits = 0
startScreen()

function startScreen(){
    document.getElementById('stats').disabled = false
    document.getElementById('menu').disabled = false
    document.getElementById('open').innerHTML = 'Start Day ('+ propertyCost.toFixed(2).toString() +')'
    gameContent = document.getElementById("game_content")

    // Coffee row
    div_array=[
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
    ]
    div_array[0].setAttribute('class','row')
    
    div_array[1].setAttribute('class','label')
    div_array[1].innerHTML = 'Coffee - Cost: '+coffeeCost.toFixed(2).toString()
    
    div_array[2].setAttribute('class','item')
    div_array[2].setAttribute('id','coffeeCount')
    div_array[2].innerHTML = coffeeCount
    
    div_array[3].setAttribute('class','item')
    minus_button = document.createElement('button')
    minus_button.setAttribute('id','sellCoffee')
    minus_button.innerHTML = '-'
    
    minus_button.addEventListener('click',()=>{
        coffeeCount--
        div = document.getElementById('coffeeCount')
        div.innerHTML = parseInt(div.innerHTML) - 1

        fundsCount += parseFloat(coffeeCost)/2
        dayProfits += parseFloat(coffeeCost)/2
        div = document.getElementById('fundsCount')
        div.innerHTML = parseFloat(parseFloat(div.innerHTML) + parseFloat(coffeeCost)/2).toFixed(2)
        if(fundsCount >= propertyCost){document.getElementById('open').disabled = false}
        if(fundsCount >= coffeeCost){document.getElementById('buyCoffee').disabled = false}
        if(fundsCount >= cupCost){document.getElementById('buyCup').disabled = false}
        if(coffeeCount == 0){document.getElementById('sellCoffee').disabled = true}
        
    })
    div_array[3].appendChild(minus_button)
    div_array[4].setAttribute('class','item')
    plus_button = document.createElement('button')
    plus_button.setAttribute('id','buyCoffee')
    plus_button.innerHTML = '+'
    plus_button.addEventListener('click',()=>{
        coffeeCount++
        div = document.getElementById('coffeeCount')
        div.innerHTML = parseInt(div.innerHTML) + 1

        fundsCount -= parseFloat(coffeeCost)
        dayProfits -= parseFloat(coffeeCost)
        div = document.getElementById('fundsCount')
        div.innerHTML = parseFloat(parseFloat(div.innerHTML) - parseFloat(coffeeCost)).toFixed(2)

        if(fundsCount < propertyCost){document.getElementById('open').disabled = true}
        if(fundsCount < coffeeCost){document.getElementById('buyCoffee').disabled = true}
        if(fundsCount < cupCost){document.getElementById('buyCup').disabled = true}
        if(coffeeCount > 0){document.getElementById('sellCoffee').disabled = false}
    })
    div_array[4].appendChild(plus_button)
    
    div_array[0].appendChild(div_array[1])
    div_array[0].appendChild(div_array[2])
    div_array[0].appendChild(div_array[3])
    div_array[0].appendChild(div_array[4])
    gameContent.appendChild(div_array[0])
    
    // Cups row
    div_array=[
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
    ]
    div_array[0].setAttribute('class','row')
    
    div_array[1].setAttribute('class','label')
    div_array[1].innerHTML = 'Cups - Cost: '+cupCost.toFixed(2).toString()
    
    div_array[2].setAttribute('class','item')
    div_array[2].setAttribute('id','cupCount')
    div_array[2].innerHTML = cupCount
    
    div_array[3].setAttribute('class','item')
    minus_button = document.createElement('button')
    minus_button.setAttribute('id','sellCup')
    minus_button.innerHTML = '-'
    minus_button.addEventListener('click',()=>{
        cupCount--
        div = document.getElementById('cupCount')
        div.innerHTML = parseInt(div.innerHTML) - 1

        fundsCount += parseFloat(cupCost)/2
        dayProfits += parseFloat(cupCost)/2
        div = document.getElementById('fundsCount')
        div.innerHTML = parseFloat(parseFloat(div.innerHTML) + parseFloat(cupCost)/2).toFixed(2)

        if(fundsCount >= propertyCost){document.getElementById('open').disabled = false}
        if(fundsCount >= coffeeCost){document.getElementById('buyCoffee').disabled = false}
        if(fundsCount >= cupCost){document.getElementById('buyCup').disabled = false}
        if(cupCount == 0){document.getElementById('sellCup').disabled = true}
    })
    
    div_array[3].appendChild(minus_button)
    
    div_array[4].setAttribute('class','item')
    plus_button = document.createElement('button')
    plus_button.setAttribute('id','buyCup')
    plus_button.innerHTML = '+'
    plus_button.addEventListener('click',()=>{
        cupCount++
        div = document.getElementById('cupCount')
        div.innerHTML = parseInt(div.innerHTML) + 1 
        fundsCount -= parseFloat(cupCost)
        dayProfits -= parseFloat(cupCost)
        div = document.getElementById('fundsCount')
        div.innerHTML = parseFloat(parseFloat(div.innerHTML) - parseFloat(cupCost)).toFixed(2)
        if(fundsCount < propertyCost){document.getElementById('open').disabled = true}
        if(fundsCount < coffeeCost){document.getElementById('buyCoffee').disabled = true}
        if(fundsCount < cupCost){document.getElementById('buyCup').disabled = true}
        if(cupCount > 0){document.getElementById('sellCup').disabled = false}
    })
    div_array[4].appendChild(plus_button)
    div_array[0].appendChild(div_array[1])
    div_array[0].appendChild(div_array[2])
    div_array[0].appendChild(div_array[3])
    div_array[0].appendChild(div_array[4])
    gameContent.appendChild(div_array[0])
    
    // Customer price row

    div_array=[
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
    ]
    div_array[0].setAttribute('class','row')
    
    div_array[1].setAttribute('class','label')
    div_array[1].innerHTML = 'Price (Customer)'
    
    div_array[2].setAttribute('class','item')
    div_array[2].setAttribute('id','price')
    div_array[2].innerHTML = parseFloat(coffeePrice).toFixed(2)
    
    div_array[3].setAttribute('class','item')
    minus_button = document.createElement('button')
    minus_button.setAttribute('id','decreasePrice')
    minus_button.innerHTML = '-'
    minus_button.addEventListener('click',()=>{
        coffeePrice -= 0.5
        div = document.getElementById('price')
        div.innerHTML = parseFloat(parseFloat(div.innerHTML) - 0.5).toFixed(2)
        if(coffeePrice < 1){document.getElementById('decreasePrice').disabled = true}
    })
    
    div_array[3].appendChild(minus_button)
    
    div_array[4].setAttribute('class','item')
    plus_button = document.createElement('button')
    plus_button.setAttribute('id','increasePrice')
    plus_button.innerHTML = '+'
    plus_button.addEventListener('click',()=>{
        coffeePrice += 0.5
        div = document.getElementById('price')
        div.innerHTML = parseFloat(parseFloat(div.innerHTML) + 0.5).toFixed(2)
        if(document.getElementById('decreasePrice').disabled == true){
            document.getElementById('decreasePrice').disabled = false
        }
    })
    div_array[4].appendChild(plus_button)
    
    div_array[0].appendChild(div_array[1])
    div_array[0].appendChild(div_array[2])
    div_array[0].appendChild(div_array[3])
    div_array[0].appendChild(div_array[4])
    gameContent.appendChild(div_array[0])

    // Funds row

    div_array=[
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
    ]
    div_array[0].setAttribute('class','row')
    
    div_array[1].setAttribute('class','label')
    div_array[1].innerHTML = 'Funds'
    
    div_array[2].setAttribute('class','item')
    div_array[2].setAttribute('id','fundsCount')
    div_array[2].innerHTML = parseFloat(fundsCount).toFixed(2)
    
    div_array[0].appendChild(div_array[1])
    div_array[0].appendChild(div_array[2])
    gameContent.appendChild(div_array[0])
    ///////////////////////////////////////////


    if(fundsCount < propertyCost){document.getElementById('open').disabled = true}
    else{document.getElementById('open').disabled = false}

    if(fundsCount < coffeeCost){document.getElementById('buyCoffee').disabled = true}
    else{document.getElementById('buyCoffee').disabled = false}

    if(fundsCount < cupCost){document.getElementById('buyCup').disabled = true}
    else{document.getElementById('buyCup').disabled = false}

    if(coffeeCount == 0){document.getElementById('sellCoffee').disabled = true}
    else{document.getElementById('sellCoffee').disabled = false}

    if(cupCount == 0){document.getElementById('sellCup').disabled = true}
    else{document.getElementById('sellCup').disabled = false}

    /*
    while(true){
        if(coffeeCount < 20){
            button = document.getElementById('buyCoffee')
            button.click()
        }
        else{
            break
        }
    }
    while(true){
        if(cupCount < 20){
            button = document.getElementById('buyCup')
            button.click()
        }
        else{
            break
        }
    }
    
    if(parseInt(document.getElementById('day').innerHTML)<50){
        const myTimeout = setTimeout(()=>{
            document.getElementById('open').click()
        }, 50);
        
    }
    */
    
    

}

openButton = document.getElementById('open')
openButton.addEventListener('click',()=>{
    
    document.getElementById('stats').disabled = true
    document.getElementById('menu').disabled = true
    const element = document.getElementById("game_content");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    gameContent.style.alignItems = 'normal'
    document.getElementById('open').disabled = true
    document.getElementById('nextDay').disabled = false
    gameContent = document.getElementById('game_content')
    visitorCount = 0
    customerCount = 0
    visitorNum = Math.floor(10*(Math.random()+1.0))
    for(var i=0;i<visitorNum;i++){
        visitorCount++
        visitorIsCustomer = Math.random()
        customerThreshold = 6/coffeePrice-0.3
        if(coffeeCount > 0 && cupCount > 0 && visitorIsCustomer < customerThreshold){
            customerCount++
            coffeeCount = coffeeCount - 1
            cupCount = cupCount - 1
        }
    }
    dayProfits += customerCount*coffeePrice
    dayProfits -= propertyCost

    reportHeading = document.createElement('h4')
    reportHeading.style.marginLeft = '20px'
    reportHeading.innerHTML = 'End of Day Report'
    eodReport = document.createElement('ul')
    eodReport.style.marginLeft = '20px'
    visitorInfo = document.createElement('li')
    visitorInfo.innerHTML = 'Visitors: '+visitorCount.toString()
    customerInfo = document.createElement('li')
    customerInfo.innerHTML = 'Customers: '+customerCount.toString()
    earningsInfo = document.createElement('li')
    eodReport.appendChild(visitorInfo)
    eodReport.appendChild(customerInfo)

    gameContent.appendChild(reportHeading)
    gameContent.appendChild(eodReport)
    fundsCount = parseFloat(fundsCount) + parseFloat(customerCount*coffeePrice) - propertyCost

    priceData.push(coffeePrice)
    revenueData.push(customerCount*coffeePrice)
    profitData.push(dayProfits)
    customerRatioData.push(customerCount/visitorCount)
    dayProfits = 0
    //nextDayButton = document.getElementById('nextDay')
    //nextDayButton.click()
})


nextDayButton = document.getElementById('nextDay')
nextDayButton.addEventListener('click',()=>{
    const element = document.getElementById("game_content");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    dayElement = document.getElementById('day')
    dayElement.innerHTML = parseInt(dayElement.innerHTML)+1 
    document.getElementById('open').disabled = false
    document.getElementById('nextDay').disabled = true
    
    startScreen()
})

statsButton = document.getElementById('stats')
statsButton.addEventListener('click',()=>{
    const gameContent = document.getElementById("game_content");
    while (gameContent.firstChild) {
        gameContent.removeChild(gameContent.firstChild);
    }
    gameContent.style.alignItems = 'center'
    fontSize = '10px'
    row = document.createElement('div')
    row.style.display = 'flex'
    row.style.width = '90%'
    row.style.height = '6%'
    row.style.border = 'solid'
    row.style.marginTop = '20px'

    col1 = document.createElement('div')
    col1.style.width = '10%'
    col1.innerHTML = 'Day'
    col1.style.display = 'flex'
    col1.style.justifyContent = 'center'
    col1.style.borderRight = 'solid'
    col1.style.fontSize = fontSize

    col2 = document.createElement('div')
    col2.style.width = '15%'
    col2.innerHTML = 'Price'
    col2.style.display = 'flex'
    col2.style.justifyContent = 'center'
    col2.style.borderRight = 'solid'
    col2.style.fontSize = fontSize

    col3 = document.createElement('div')
    col3.style.width = '30%'
    col3.innerHTML = 'Sales Revenue'
    col3.style.display = 'flex'
    col3.style.justifyContent = 'center'
    col3.style.borderRight = 'solid'
    col3.style.fontSize = fontSize

    col4 = document.createElement('div')
    col4.style.width = '15%'
    col4.innerHTML = 'Profit'
    col4.style.display = 'flex'
    col4.style.justifyContent = 'center'
    col4.style.borderRight = 'solid'
    col4.style.fontSize = fontSize

    col5 = document.createElement('div')
    col5.style.width = '30%'
    col5.innerHTML = 'Customer Ratio'
    col5.style.display = 'flex'
    col5.style.justifyContent = 'center'
    col5.style.fontSize = fontSize

    row.appendChild(col1)
    row.appendChild(col2)
    row.appendChild(col3)
    row.appendChild(col4)
    row.appendChild(col5)
    gameContent.appendChild(row)

    currentDay = document.getElementById('day')
    var fileContent=['Day,Price,Sales Revenue,Profit,Customer Ratio\n']
    var dataRow

    for(var i=0;i<=parseInt(currentDay.innerHTML);i++){
        dataRow = ''
        if(i < parseInt(currentDay.innerHTML)){
            dataRow = i.toString()+','
            dataRow += priceData[i].toFixed(2).toString()+','
            dataRow += revenueData[i].toFixed(2).toString()+','
            dataRow += profitData[i].toFixed(2).toString()+','
            dataRow += customerRatioData[i].toFixed(2).toString()
        }
        row = document.createElement('div')
        row.style.display = 'flex'
        row.style.width = '90%'
        row.style.height = '6%'
        row.style.borderRight = 'solid'
        row.style.borderLeft = 'solid'
        row.style.borderBottom = 'solid'
    
        col1 = document.createElement('div')
        col1.style.width = '10%'
        col1.innerHTML = i
        col1.style.display = 'flex'
        col1.style.justifyContent = 'center'
        col1.style.borderRight = 'solid'
        col1.style.fontSize = fontSize
        
    
        col2 = document.createElement('div')
        col2.style.width = '15%'
        if(i == priceData.length){col2.innerHTML = coffeePrice.toFixed(2)}
        else{col2.innerHTML = priceData[i].toFixed(2)}
        col2.style.display = 'flex'
        col2.style.justifyContent = 'center'
        col2.style.borderRight = 'solid'
        col2.style.fontSize = fontSize
        
    
        col3 = document.createElement('div')
        col3.style.width = '30%'
        if(i == revenueData.length){col3.innerHTML = ' '}
        else{col3.innerHTML = revenueData[i].toFixed(2)}
        col3.style.display = 'flex'
        col3.style.justifyContent = 'center'
        col3.style.borderRight = 'solid'
        col3.style.fontSize = fontSize
    
        col4 = document.createElement('div')
        col4.style.width = '15%'
        if(i == profitData.length){col4.innerHTML = ' '}
        else{col4.innerHTML = profitData[i].toFixed(2)}
        col4.style.display = 'flex'
        col4.style.justifyContent = 'center'
        col4.style.borderRight = 'solid'
        col4.style.fontSize = fontSize

        col5 = document.createElement('div')
        col5.style.width = '30%'
        if(i == profitData.length){col5.innerHTML = ' '}
        else{col5.innerHTML = customerRatioData[i].toFixed(2)}
        col5.style.display = 'flex'
        col5.style.justifyContent = 'center'
        col5.style.fontSize = fontSize
    
        row.appendChild(col1)
        row.appendChild(col2)
        row.appendChild(col3)
        row.appendChild(col4)
        row.appendChild(col5)
        gameContent.appendChild(row)

        fileContent[0] = fileContent[0]+dataRow+'\n'
    }
    exportButton = document.createElement('button')
    exportButton.style.fontSize = fontSize
    exportButton.style.marginTop = "10px"
    exportButton.innerHTML = 'Export data'


    exportButton.addEventListener('click',()=>{
        const file = new File(fileContent, 'sales_data.csv', {
            type: 'text/plain',
        })
        const link = document.createElement('a')
        const url = URL.createObjectURL(file)
          
        link.href = url
        link.download = file.name
        document.body.appendChild(link)
        link.click()
          
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    })
    gameContent.appendChild(exportButton)

    avg_profit = 0
    avg_customer_ratio = 0
    for(var i=0;i<profitData.length;i++){
        avg_profit += profitData[i]
        avg_customer_ratio += customerRatioData[i]
    }
    avg_profit = avg_profit/profitData.length
    avg_customer_ratio = avg_customer_ratio/customerRatioData.length
    std_dev_profit = 0
    std_dev_customer_ratio = 0
    for(var i=0;i<profitData.length;i++){
        std_dev_profit += Math.pow((profitData[i]-avg_profit),2)
        std_dev_customer_ratio += Math.pow((customerRatioData[i]-avg_customer_ratio),2)
    }
    std_dev_profit = Math.pow(std_dev_profit,0.5)/profitData.length
    std_dev_customer_ratio = Math.pow(std_dev_customer_ratio,0.5)/customerRatioData.length
    console.log('Average Customer Ratio: '+avg_customer_ratio.toFixed(2).toString())
    console.log('Std Dev Customer Ratio: '+std_dev_customer_ratio.toFixed(2).toString())
    console.log('Average Profit: '+avg_profit.toFixed(2).toString())
    console.log('Std Dev Profit: '+std_dev_profit.toFixed(2).toString())
})

menuButton = document.getElementById('menu')
menuButton.addEventListener('click',()=>{
    const element = document.getElementById("game_content");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    startScreen()
})
