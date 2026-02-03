<template>
<div class="text-center mt-4" v-if="loading">
  <v-progress-circular 
  color="primary"
  indeterminate
  :size="50"
  :width="3"
  ></v-progress-circular>
</div>

<div class="card-start" :class="{ 'no-scroll': !showScroll}" v-if="!loading">
  <div v-if="!validate" class="content_center" >
    <v-alert type="error" :title="t('formAccessError')" :text="response" icon="mdi-lock-alert-outline"></v-alert>
  </div>  
  <div v-if="showCard && validate" 
       class="custom-card" 
       :class="{ 'animate-slide-up-fade-out': animateCard, 'fade-out': animateFadeOut }"
       @click="flipCard"
  >
    <div class="left-card">
      <img src="@/assets/ImagesStartButton/IMG.jpg" alt="Logo" class="logo">
    </div>
    <div class="right-card">        
      <div class="right-card-up">
        <img src="@/assets/logoLetras.png" alt="Logo Letras" class="logo-letras">
        <h2>{{ t('supplierFormTitle') }}</h2>
      </div>
      <div class="right-card-down">
        <v-btn color="primary" class="start-button" @click="startForm()" >{{ t('start') }}</v-btn>
      </div>                    
    </div>
  </div>
  <div v-else class="stepper-container" :class="{ 'animate-slide-down': animateStep, 'fade-in': animateFadeIn }">
    <transition name="slide">
      <Steps v-show="showForm" />      
    </transition>
  </div>
  
</div>
</template>


<script>
import { useT } from '~/composables/useT'
import {useInvitation} from '~/composables/services/invitation'
export default {
  name: 'Start',
  components: {},
  props: [],
  data () {
      return {
      showCard: true,
      showScroll: false,
      animateCard: false,
      animateStep: false,
      animateFadeOut: false,
      animateFadeIn: false,
      showForm: false,
      validate: false,   
      response: "",
      loading: true
    }
  },
  methods: {
    flipCard() {
      const card = document.querySelector('.custom-card');
      card.classList.toggle('backflip');
    },
    startForm() {
      this.showScroll = false;
      this.animateCard = true;
      setTimeout(() => {
        this.showCard = false;
        setTimeout(() => {
          this.animateStep = true;
          this.animateFadeOut = true;
          setTimeout(() => {
            this.showForm = true;
            this.animateFadeIn = true;
          }, 100);
        }, 100);
      }, 400); 
    },
    updateImage() {
      this.$forceUpdate(); // Forces Vue to re-render the component
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateImage);
   
    let code = window.location.href.split('/').pop(); 
    this.loading = true; 
    const invitationApi = useInvitation()
    invitationApi.get_info_invitation(code)
    .then((r) => {
        console.log(r)
      if (r.status) {        
        this.validate = true;
      } else {
        this.validate = false;
        this.response = "Código no válido o no activo.";
      }
    })
    .catch((error) => {
      this.validate = false;
      this.response = error;
    })
    .finally(() => {
      this.loading = false;
    });    

  },
  computed: {
    t() {
      return useT().t
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateImage);
  }
  
}
</script>