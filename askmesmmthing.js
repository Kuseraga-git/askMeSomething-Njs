#!/usr/bin/env node
var program = require('commander')
fs = require('fs')
const readline = require('readline')

const NBHISTOIRE = 10 //nombre de question dans la catégorie Histoire
const NBJEUXVIDEOS = 10 //nombre de question dans la catégorie Jeux Vidéos
const NBFAITSDIVERS = 10 //nombre de question dans la catégorie Faits Divers

program
    .version('1.0.0', '-v, --version')
    .option('-s, --histoire', 'Thème : l\'histoire')
    .option('-j, --jeuxvideo', 'Thème : les Jeux Vidéos')
    .option('-f, --faitsdivers', 'Thème : Les faits divers')
    .parse(process.argv);

program.on('--help', function(){
    console.log('  Examples:')
    console.log('')
    console.log('    $ custom-help --help')
    console.log('    $ custom-help -h')
    console.log('')
})
program.parse(process.argv)

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

function randInt(low, high)
{
    return Math.floor(Math.random() * (high  - low) + low)
}

const getJson = async() => {
    return new Promise((resolve, reject) => {
	let questions = 0
	fs.readFile('questions.json', 'utf8', function(err, data){
	    if (err) {
		return console.log(err)
	    }
	    questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'))
	    resolve(questions)
	})
    })
}

function histoireQuizz(questions)
{
    var rand = randInt(0, NBHISTOIRE)

    var q = questions.histoire[rand].question
    var r1 = questions.histoire[rand].rep1
    var r2 = questions.histoire[rand].rep2
    var r3 = questions.histoire[rand].rep3
    var r4 = questions.histoire[rand].rep4
    console.log('Question :\n' + q + '\n\nRéponses :\n' + r1.text + '\n' + r2.text + '\n' + r3.text + '\n' + r4.text)
    rl.question('\nEntrez votre réponse :\n', (answer) => {
	if (answer == r1.text && r1.res == true)
	    console.log('\nBonne réponse !')
	else if (answer == r2.text && r2.res == true)
	    console.log('\nBonne réponse !')
	else if (answer == r3.text && r3.res == true)
	    console.log('\nBonne réponse !')
	else if (answer == r4.text && r4.res == true)
	    console.log('\nBonne réponse !')
	else
	    console.log('\nDésolé ... Mauvaise réponse.')
	rl.close()
    })
}


function jeuxvideoQuizz(questions)
{
    var rand = randInt(0, NBJEUXVIDEOS)

    var q = questions.jeuxvideo[rand].question
    var r1 = questions.jeuxvideo[rand].rep1
    var r2 = questions.jeuxvideo[rand].rep2
    var r3 = questions.jeuxvideo[rand].rep3
    var r4 = questions.jeuxvideo[rand].rep4
    console.log('Question :\n' + q + '\n\nRéponses :\n' + r1.text + '\n' + r2.text + '\n' + r3.text + '\n' + r4.text)
    rl.question('\nEntrez votre réponse :\n', (answer) => {
	if (answer == r1.text && r1.res == true)
	    console.log('\nBonne réponse !')
	else if (answer == r2.text && r2.res == true)
	    console.log('\nBonne réponse !')
	else if (answer == r3.text && r3.res == true)
	    console.log('\nBonne réponse !')
	else if (answer == r4.text && r4.res == true)
	    console.log('\nBonne réponse !')
	else
	    console.log('\nDésolé ... Mauvaise réponse.')
	rl.close()
    })
}

function faitsdiversQuizz(questions)
{
    var rand = randInt(0, NBJEUXVIDEOS)

    var q = questions.faitsdivers[rand].question
    var r1 = questions.faitsdivers[rand].rep1
    var r2 = questions.faitsdivers[rand].rep2
    var r3 = questions.faitsdivers[rand].rep3
    var r4 = questions.faitsdivers[rand].rep4
    console.log('Question :\n' + q + '\n\nRéponses :\n' + r1.text + '\n' + r2.text + '\n' + r3.text + '\n' + r4.text)
    rl.question('\nEntrez votre réponse :\n', (answer) => {
	if (answer == r1.text && r1.res == true)
	    console.log('\nBonne réponse !')
	else if (answer == r2.text && r2.res == true)
	    console.log('\nBonne réponse !')
	else if (answer == r3.text && r3.res == true)
	    console.log('\nBonne réponse !')
	else if (answer == r4.text && r4.res == true)
	    console.log('\nBonne réponse !')
	else
	    console.log('\nDésolé ... Mauvaise réponse.')
	rl.close()
    })
}

async function main()
{
    try {
	const questions = await getJson()
	if (program.histoire)
	    histoireQuizz(questions)
	else if (program.jeuxvideo)
	    jeuxvideoQuizz(questions)
	else if (program.faitsdivers)
	    faitsdiversQuizz(questions)
	else {
	    var rand = randInt(0, 3)
	    if (rand == 0)
		histoireQuizz(questions)
	    else if (rand == 1)
		jeuxvideoQuizz(questions)
	    else if (rand == 2)
		faitsdiversQuizz(questions)
	    else
		console.log('Erreur')
	}
    } catch (e) {
	console.error('FAIL')
    }
}

main()
