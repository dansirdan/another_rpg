class Player {
    constructor(charObj){

        this.rank = charObj.rank;
        // Rank - possibility [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        // 1. Seeker
        // 2. Initiate
        // 3. Craftsman
        // 4. Hunter
        // 5. Apprentice
        // 6. Way Finder
        // 7. Survivalist
        // 8. Adept
        // 9. Light Bearer
        // 10. Champion
        this.health = charObj.stats.health;
        this.spirit = charObj.stats.spirit;
    }
}