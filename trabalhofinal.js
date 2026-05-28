const ask = require('readline-sync')

function createCharacter() {

    let name = ask.question("Please insert your name: ")

    console.clear(name)

    let chooseClass = Number(ask.question(`
Please choose your class:

1 - Warrior
2 - Mage
3 - Ranger

Insert the number : `))

    console.clear(chooseClass)

    let warrior = {
        className: "Warrior",
        health: 150,
        defense: 10,
        potions: 3,
        attack: function warriorAttack() {

            console.log("⚒️ The warrior strikes with a powerful attack!")

            let damage = Math.floor(Math.random() * 9) + 22

            return damage
        }
    }
    let mage = {
        className: "Mage",
        health: 130,
        defense: 5,
        potions: 6,
        attack: function mageAttack() {

            console.log("🔥 The mage unleashes a devastating spell!")

            let damage = Math.floor(Math.random() * 9) + 18

            return damage
        }
    }

    let ranger = {
        className: "Ranger",
        health: 100,
        defense: 8,
        potions: 4,
        attack: function rangerAttack() {
            
            console.log("🏹 The ranger fires a precise arrow from afar!")

            let damage = Math.floor(Math.random() * 9) + 16

            return damage
        }
    }

    if (chooseClass === 1) {
        return { name: name, class: warrior }
    } else if (chooseClass === 2) {
        return { name: name, class: mage }
    } else {
        return { name: name, class: ranger }
    }
}

function combatMenu() {

    console.clear()

    console.log("YOUR TURN!!")

    ask.question("Press ENTER to continue...")

    let menu = Number(ask.question(`                       
========================        Name of player: ${character.name}                  
xxxxxxxxxxxxxxxxxxx             Character: ${character.class.className}
xxx COMBAT TURN xxx             Life: ${character.class.health}
xxxxxxxxxxxxxxxxxxx             Defense: ${character.class.defense}
========================        Potions: ${character.class.potions}
                                

1 - Attack                      Enemies to defeat: ${enemies.length}/5
2 - Defend                    
3 - Use Potion

Choose the number: `))

    console.clear(menu)

    return menu
}

function startCombat(character) {

    while (character.class.health > 0 && enemies.length > 0) {

        console.clear()

        let enemy = generateEnemy(enemies)

        switch (combatMenu()) {

            case 1:
                console.clear()

                console.log(`
You dealt ${attack(character, enemy)} damage!
`)
                ask.question("Press ENTER to continue...")

                console.clear()

                console.log("TURN OF ENEMY!!")
                console.log(turnEnemy(character, enemy))
                ask.question("Press ENTER to continue...")
                break;
            case 2:
                console.clear()
                console.log(defend(character))
                ask.question("Press ENTER to continue...")

                console.clear()
                console.log("TURN OF ENEMY!!")
                console.log("Since you used the defense, the enemy did not reach your life, but your defense decreased")
                ask.question("Press ENTER to continue...")
                break;
            case 3:
                console.clear()

                let potionResult = usePotion(character)

                if (potionResult === "Insufficient potions!"){
                    console.log(potionResult)
                    ask.question("Press ENTER to continue...")
                } else {
                    console.log(potionResult)
                    ask.question("Press ENTER to continue...")
    
                    console.clear()
                    console.log("TURN OF ENEMY!!")
                    console.log(turnEnemy(character, enemy))
                    ask.question("Press ENTER to continue...")
                }
                break;
            default:
                console.clear()
                
                console.log("!Command not recognized!")
                ask.question("Press ENTER to continue...")
                break;
        }
    }

    if (enemies.length <= 0) {

        console.clear()
        console.log(`
                You win!!

Congratulations you defeated all the enemies!!!!`)
    } else {

        console.clear()
        console.log(`
                You lose!!

Character: ${character.class.className}
Life: ${character.class.health}
Defense: ${character.class.defense}
Potions: ${character.class.potions}

Enemies defeat: ${enemies.length}/5`)
    }
}

function generateEnemy(enemies) {

    let index = Math.floor(Math.random() * enemies.length)

    if (enemies[index].health <= 0) {
        enemies.splice(index, 1)

        return enemies[Math.floor(Math.random() * enemies.length)]
    }

    return enemies[index]
}

function turnEnemy(character, enemy) {

    let demageEnemy = Math.floor(Math.random() * 3)

    if (enemy.health <= 0) {
        return `The enemy ${enemy.name} of the turn cannot deal damage to you since he died at HORABUENA!!`
    } else {
        if (demageEnemy === 0) {
            character.class.health = character.class.health - enemy.minDamage
            return `
Enemy attacked with its minimum damage :()\n`
        } else if (demageEnemy === 1) {
            character.class.health = character.class.health - enemy.maxDamage
            return `
Enemy attacked with its maximum damage :()\n`
        } else {
            return `
The enemy used defense, he did not hit your health\n`
        }
    }
}

function attack(character, enemy) {

    let damage = character.class.attack()

    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].name === enemy.name) {
            enemies[i].health -= damage
            console.log(`
Enemy of the turn ${enemy.name}, he now has ${enemies[i].health} HP`)

            if (enemies[i].health <= 0) {
                console.log(`
💀 ${enemy.name} was defeated!`)
                enemies.splice(i, 1)
            }
        }
    }
    return damage
}

function defend(character) {

    if (character.class.defense <= 0) {
        return "Insufficient defense!"
    } else {
        character.class.defense = character.class.defense - Math.floor(Math.random() * character.class.defense)
        return `
Successfully applied defense

Your defense has been decreased by ${character.class.defense}`
    }
}

function usePotion(character) {

    if (character.class.potions <= 0) {
        return "Insufficient potions!"
    } else {
        character.class.potions = character.class.potions - 1
        character.class.health = character.class.health + Math.floor(Math.random() * (character.class.health / 2))

        return `
potion used successfully

Your life is now in: ${character.class.health}`
    }
}



let enemies = [
    {
        name: "Mine Goblin",
        health: 40,
        minDamage: 5,
        maxDamage: 10
    },

    {
        name: "Moria Orc",
        health: 60,
        minDamage: 8,
        maxDamage: 12
    },

    {
        name: "Shadow Demon",
        health: 100,
        minDamage: 15,
        maxDamage: 22
    },

    {
        name: "Skeleton Knight",
        health: 65,
        minDamage: 10,
        maxDamage: 14
    },

    {
        name: "Cave Spider",
        health: 70,
        minDamage: 8,
        maxDamage: 12
    }

]

let character = createCharacter()
startCombat(character)