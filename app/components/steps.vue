<template>
  {{finish}}
    <v-row class="content_center" v-if="!finish">   
        <v-col>                        
           <v-stepper v-model="step" class="pa-4">
              <template v-slot:default="{ prev, next }">
                <v-stepper-header class="stepperConfig">
                  <template v-for="n in steps" :key="`${n}-step`">
                    <v-stepper-item
                      :complete="step > n"
                      :step="`Step {{ n }}`"
                      :value="n"
                      color="primary"                      
                    ></v-stepper-item>

                    <v-divider
                      v-if="n < steps.length"
                      :key="n"
                    ></v-divider>
                  </template>
                </v-stepper-header>
                <v-stepper-window>
                  <v-stepper-window-item :value="1" key="1">
                    <h2 class="card-title">{{ t('privacyPolicy') }}</h2>
                    <div class="ml-5 pl-5">
                        <h4 style="margin-bottom: 10px;">
                            {{ t('readPrivacyPolicy') }} <span class="required">{{ t('required') }}</span>
                        </h4>
                        <p class="helper">
                            {{ t('readPrivacyPolicyLinkText') }} <a href="https://www.sampol.com/wp-content/uploads/2024/08/Politica-de-Privacidad-y-protecccion-de-datos-2.pdf" target="_blank">{{ t('here') }}</a>.
                        </p>
                        <v-radio-group v-model="data_steps[1].data.acept_policy">
                            <v-radio color="#005CB9" :label="t('yes')" value="true"></v-radio>
                            <v-radio color="#005CB9" :label="t('no')" value="false"></v-radio>
                        </v-radio-group>
                    </div>
                  </v-stepper-window-item>
                  <v-stepper-window-item :value="2" >
                    <Supplier @valid="onStepValid" v-model="data_steps[2].data"></Supplier>
                  </v-stepper-window-item>
                  <v-stepper-window-item :value="3" > 
                      <h2 class="card-title mb-9">{{ t('contactInformation') }}</h2>
                      <Directions @valid="onStepValidNumberStep" v-model="data_steps[3].data.directions"></Directions>  
                      <v-divider class="mt-9 mb-9 pt-9" color="white"></v-divider>                    
                      <Contacts @valid="onStepValidNumberStep" v-model="data_steps[3].data.contacts"></Contacts>   
                  </v-stepper-window-item>
                  <v-stepper-window-item :value="4">
                    <BankAccounts @valid="onStepValid" v-model="data_steps[4].data"></BankAccounts>
                  </v-stepper-window-item>
                  <v-stepper-window-item :value="5" >
                    <Documents @valid="onStepValid" v-model="data_steps[5].data" :email_cert="getEmailAdm" :code="this.data_steps[1].data.invitation_code"></Documents>
                  </v-stepper-window-item>
                </v-stepper-window>
                <v-divider style="margin-top: 100px;"></v-divider>
                <div class="d-flex justify-space-between mt-6 pt-9 mb-6">
                  <v-btn
                    v-if="step > 1"
                    variant="tonal"
                    @click="onPrev(prev)"
                    class="ml-4"
                  >
                    {{t('previousStep2')}}
                  </v-btn>
                  <v-spacer></v-spacer>                 
                  <v-btn
                    color="primary"
                    :disabled="disabled"
                    @click="onNext(next)"
                    class="mr-4"
                    v-if="step != steps.length"

                  >
                    {{t('nextStep')}}

                  </v-btn>  
                  
                  <v-btn
                    color="success"
                    v-if="step == steps.length"
                    :disabled="disabled"
                    @click="save"
                    class="mr-4"
                  >
                    {{t('finishAndSubmit')}}

                  </v-btn>  
                </div>
                <!-- <div class="d-flex justify-space-between mt-4 mb-6 mr-4"   v-if="disabled">
                  <v-spacer></v-spacer>
                  <v-alert 
                    :text="t('completeFieldsNextStep')" 
                    type="error" 
                    variant="tonal"   
                    density="compact"   
                    class="mb-2 text-caption pa-2"
                  ></v-alert>
                </div> -->
                <v-snackbar
                  location="bottom"
                  color="error"
                  v-model="disabled"
                >
                  <v-icon>mdi-alert-circle-outline</v-icon>
                  {{t('completeFieldsNextStep')}}                  
                </v-snackbar>
              </template>
            </v-stepper>
        </v-col>        
    </v-row>
    <v-row v-else>
      <v-col>
        entree
        <ThankCard name="Claudia"  />
         :name="data_steps[2].data?.social_reason"

      </v-col>
    </v-row>

</template>
<script>
import { useT } from '~/composables/useT'

export default {
  name: 'Steps',
  components: {},
  props: [],
  data () {
    return {     
        pol: null,
        step: 3,
        steps: [1,2, 3, 4, 5],
        data_steps: {
        1: {name: 'policy', valid: false, data: {'acept_policy': false, 'invitation_code': ''}},
        2: {name: 'supplier', valid: false, data: null},
        3: {name: 'directions_contacts', valid: false, valid_dir: false, valid_cont: false, data: {contacts : null, directions: null}},
        4: {name: 'bank_accounts', valid: false, data: null},
        5: {name: 'documents', valid: true, data: null}
        },
        code: '',
        finish: false
      

    }
  },
  props: {
   
  },
  watch: {
    'data_steps.1.data.acept_policy'(val) {
      this.data_steps[1].valid = (val === "true")
    }
  },  
  methods: {  
      
    onStepValid (isValid) {
      this.data_steps[this.step].valid = isValid
    },
    onStepValidNumberStep (isValid, field) {
      this.data_steps[this.step][field] = isValid
      this.data_steps[this.step].valid = this.data_steps[this.step].valid_dir && this.data_steps[this.step].valid_cont
    },
    onNext (next) {
      if (this.disabled) return
      next()
    },
    onPrev (prev) {
      prev()
    },
    save(){
      alert("save")
    }
  },
  computed: {
    t() {
      return useT().t
    },
    disabled () {     
      return !this.data_steps[this.step].valid
    },
    getEmailAdm(){
      if(this.data_steps[4].data)
        return this.data_steps[4].data.find(x => x.type === "Administrativo")?.email
      return ""
    },  
  },
  mounted () {
    this.data_steps[1].data.invitation_code = window.location.href.split('/').pop(); 

    
  }
}


</script>