<template>
    da
    tertrr
    fd
    fd
    f
    f
    df
    d
    f
    fd
    <v-card class="thank-card">
        <v-card-title class="title">{{ t('thankYouTitle') }}</v-card-title>
        <v-img :src="logoSrc" class="logo" alt="Logo" contain></v-img>
        <v-card-text class="text">
            <v-icon large color="green" class="mb-3">mdi-check-circle</v-icon>
            <p>{{ t('thankYouMessage', { name }) }}</p>
            <p>{{ t('thankYouDescription') }}</p>
        </v-card-text>
    </v-card>
</template>
<script>
import logoLetras from '@/assets/logoLetras.png';

export default {
  name: 'ThankCard',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      logoSrc: logoLetras
    };
  },
  methods: {
    
  }
};
</script>