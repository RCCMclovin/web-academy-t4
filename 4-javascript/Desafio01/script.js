var pontuacao = 0
while (true) {
    var jogador = parseInt(prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura\n"))
    console.log(jogador)
    var cpu = Math.floor(Math.random() * 3) + 1
    if (jogador == 1) {
        if(cpu == 1){
            console.log("O computador jogou Papel")
            console.log("A rodada empatou!")
        }
        else if(cpu == 2){
            console.log("O computador jogou Pedra")
            console.log("Você ganhou!")
            pontuacao+=1
        }
        else if(cpu == 3){
            console.log("O computador jogou Tesoura")
            console.log("Você perdeu! Sua pontuação foi de "+pontuacao)
            break
        }
    }
    else if (jogador == 2) {
        if(cpu == 1){
            console.log("O computador jogou Papel")
            console.log("Você perdeu! Sua pontuação foi de "+pontuacao)
            break
        }
        else if(cpu == 2){
            console.log("O computador jogou Pedra")
            console.log("A rodada empatou!")
        }
        else if(cpu == 3){
            console.log("O computador jogou Tesoura")
            console.log("Você ganhou!")
            pontuacao+=1
        }
    }
    else if (jogador == 3) {
        if(cpu == 1){
            console.log("O computador jogou Papel")
            console.log("Você ganhou!")
            pontuacao+=1
        }
        else if(cpu == 2){
            console.log("O computador jogou Pedra")
            console.log("Você perdeu! Sua pontuação foi de "+pontuacao)
            break
        }
        else if(cpu == 3){
            console.log("O computador jogou Tesoura")
            console.log("A rodada empatou!")
        }
    }
    else{
        console.log("Você perdeu! Sua pontuação foi de "+pontuacao)
        break
    }
}
