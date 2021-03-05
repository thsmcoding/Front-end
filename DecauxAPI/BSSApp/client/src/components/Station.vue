<style scoped>

#mainspan {
    margin-right: 150px;
    margin-left: 15px;
}

input {
    padding: 2px;
}

label {
    width: 10px;
    display: inline-block;
    margin-right: 60px;
}

#station-info {
    background-color: tan;
    float: right;
    width: 45%;
    height: 150px;
    border-radius: 25px;
    padding: 10px;
}

span #myselected {
    color: red;
    font-weight: bold;
    ;
}

#station-list {
    float: left;
    width: 45%;
    height: 150px;
    border-radius: 25px;
    padding: 10px;
    background-color: BurlyWood;
}

</style>

<template>

<div id="main">
    <div id="station-list" class="small-container">
        <h4>Station choice</h4>
        <select v-model="selected" @change="changeStation($event)">
            <option value="" selected disabled>Please choose a station</option>
            <option v-for="station in stations" :v-bindvalue="station.name">{{ station.name }}</option>
        </select>
        <input v-on:click="message" type="button" value="Get info">
        </button>
        <br>
        <br>
        <span id="mainspan">Selected station is : <span id="myselected">{{ selected }}</span></span>
    </div>

    <div id="station-info" class="small-container">
        <h4>Station info</h4>
        <div class="form-group">
            <label for="cn">Name:</label>
            <input v-model="input.name" type="text" class="form-control" id="cnid">
        </div>
        <div class="form-group">
            <label for="city">City:</label>
            <input v-model="input.city" type="text" class="form-control" id="city">
        </div>
        <div class="form-group">
            <label for="country">Country:</label>
            <input v-model="input.country" type="text" class="form-control" id="country">
        </div>
    </div>
</div>
</div>

</template>

<script>

import Vue from 'vue'
import axios from 'axios'
export default {
    el: '#main',
    name: 'Station',
    data() {
        return {
            selected: '',
            span: {
                myspan: '',
            },
            input: {
                name: '',
                city: '',
                country: '',

            },
            stations: null,
        };
    },

    methods: {


        message: function() {
            var station = this.selected;
            var index = this.stations.findIndex(function(item, i) {
                return item.name === station
            });
            var name = this.stations[index]['name']
            var commercialname = this.stations[index]['commercial_name']
            var country = this.stations[index]['country_code']
            if(name === null){
              this.input.name = "Not defined";
            }
            else{
              this.input.name = name;
            }
            if (commercialname === null) {
              this.input.city = "Not defined";
            }
            else{
              this.input.city = commercialname;
            }
            if (country === null) {
              this.input.country = "Not defined";
            }
            else {
              this.input.country = country;
            }
        },

        changeStation: function($event) {
          alert("You are about to change the current station");
        }
    },

    created: function() {
        axios.get("https://api.jcdecaux.com/vls/v1/contracts?apiKey= PLUG IN YOUR API KEY")
            .then(response => {
                this.stations = response.data;
            });

    }
};

</script>
