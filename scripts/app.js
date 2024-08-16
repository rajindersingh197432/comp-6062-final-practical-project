const app = Vue.createApp({
    data() {
        return {
            fact: '', 
            city: 'London', 
            word: 'Bottle', 
            recentWeather: {},
            dictionary: ''
        };
    },
    created() {
        this.fetchFact();  
        this.fetchWeather();
        this.defineWord();
    },
    computed: {
    },
    methods: {
        fetchFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())  
                .then(data => {
                    this.fact = data.text;  
                })
                .catch(error => {
                    console.error('Error: ', error);
                });
        },
         fetchWeather() {
            fetch(`https://goweather.herokuapp.com/weather/${this.city}`)
                .then(response => response.json())
                .then(data => this.recentWeather = data);
        },
        defineWord() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)   
                .then(response => response.json())
                .then(data => {
                        const Data = data[0];
                        this.dictionary = {
                            word: Data.word,
                            phonetic: Data.phonetic ,
                            partOfSpeech: Data.meanings[0].partOfSpeech,
                            definition: Data.meanings[0].definitions[0].definition
                        };
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
});

app.mount('#app');
