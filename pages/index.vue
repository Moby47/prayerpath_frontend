<template>

  <v-row justify="center" align="center">
    <v-col>

      <template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card
        class="mx-auto"
        color="#ffffff"
        elevation="20"
        py-4 
        style="margin: 10px;"
        d-flex
      >

      <!--content-->
      <template>
  <v-card
    class="mx-auto my-12"
    style="background-color: #ffffff; color:black !important;"
  >
     <v-img
      class="align-end text-white"
      height="300"
      src="https://cdn.pixabay.com/photo/2022/12/25/07/49/door-7676969_960_720.jpg"
      cover
    >
      <v-card-title>Quote God & Pray</v-card-title>
    </v-img>

   
      <v-card-subtitle>
        <span class="me-1" style="color:black !important;">
          "God is not human, that he should lie, not a human being, that he should change his mind. 
Does he speak and then not act? Does he promise and not fulfill?"
        </span>
      <v-chip-group>
        <v-chip>Numbers 23:19</v-chip>
      </v-chip-group>
      </v-card-subtitle>
    
  <hr>
    <v-card-actions>
      <v-btn
      color="#4a9ec1"
        variant="text"
        :to="{ name: 'home'}"
      >
        Start
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
    <!--content-->

      </v-card>
    </v-col>
  </v-row>

</template>
     


    </v-col>
  </v-row>


</template>


<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>