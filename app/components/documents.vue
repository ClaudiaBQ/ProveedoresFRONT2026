<template>
    <v-form ref="formDocuments"> 
        <h2 class="card-title">{{ t('companyDocumentation') }}</h2>
        <h4>{{ t('taxIdentification') }}</h4>
        <v-file-input 
          :label="t('attachFile')"
          variant="outlined" 
          dense
          @update:modelValue="file => handleUpload(file, ident_fiscal)" 
        ></v-file-input>       
    
        <h2 class="card-subtitle mt-3">{{ t('certificates') }}</h2>
        <h4 class="helper mb-5">
          {{ t('selectCertificates') }}
        </h4>
        <v-list lines="one">
          <v-list-item
            v-for="cert in items"
            :key="cert.id"        
          >
              <v-checkbox  :label="t(cert.label)" v-model="cert.checked"></v-checkbox>
              <v-row v-if="cert.checked">            
                  <v-col>
                      <v-file-input 
                          @update:modelValue="file => handleUpload(file, cert)" 
                          variant="outlined" 
                          dense    
                          :label="t('attachFile')"                   
                          :rules="cert.checked ? [rules.required] : []"
                      ></v-file-input>
                  </v-col>
                  <v-col>
                      <v-date-input 
                          :label="t('expirationDate')" 
                          variant="outlined"       
                          input-format="dd-mm-yyyy"
                          v-model="cert.data.date_expiration"
                          :rules="cert.checked ? [rules.required] : []"
                      ></v-date-input>
                  </v-col>
              </v-row>
          </v-list-item>
        </v-list>
        <div v-if="selectedCertificates">
          <h4>
            {{ t('emailCert') }} <span class="required">{{ t('required') }}</span>
          </h4>
          <v-text-field    
            v-model="localEmail"
            variant="outlined"
            dense
            clearable
            :placeholder="t('writeYourAnswer')" 
            :rules="selectedCertificates
                        ? [rules.required, rules.email]
                        : [rules.email]"
          ></v-text-field>
        </div>        
        <v-divider  class="mt-9 mb-8"></v-divider>
        <h4>{{ t('commentTitle') }}</h4>
        <v-textarea
          :label="t('comment')"
          v-model="localComment"
          :counter="2000"
          maxlength="2000"
          rows="8"
          auto-grow
          variant="outlined"
          dense
        ></v-textarea>
    </v-form>    
    <v-snackbar
                    v-model="showFileError"
                    :timeout="3000"
                    location="top"
                    color="error"
                    min-height="90px"
                    timer
    >
      <v-icon>mdi-alert-circle-outline</v-icon>
      {{t('File_Error')}}
    </v-snackbar>
</template>

<script>
import Documents from '~/models/Documents.js'
import {useMaster} from '~/composables/services/master.js'
import { useT } from '~/composables/useT'
import { useEgnyte } from "@/composables/services/egnyte.js"

export default {
  name: 'Documents',
  components: {}, 
  data () {   
    return {
       rules: {
        required: v => !!v ||  this.t('required'),
        email: v => /.+@.+\..+/.test(v)|| this.t('emailMustBeValid')
      }, 
      localComment: '',
      items: [],
      ident_fiscal: new Documents(),
      localEmail:'',
      showFileError: false,
    }
  },
  props: {
    email_cert: {
      type:String,
      default: ''
    },
    modelValue: {
      type: Object,
      default: null
    },
    code: {
      type: String,
      default: ''
    }
  },
  methods: { 
    async handleUpload(file, dataInfo) {      
      if (!file) return
      this.showFileError = false;

      let doc = dataInfo.data?? dataInfo
      const { upload_file } = useEgnyte()
      let now = new Date()
      let nameFile = now.toISOString().split("T")[0] + "-" + String(now.getSeconds()).padStart(2, "0") + "_" + doc.type
      try {
        const res = await upload_file(
          this.code,   
          nameFile,         
          file               
        )
        if (res.status){
          doc.file_id_egnyte = res.response.group_id
          this.$nextTick(() => this.validateForm())

        }else{
          this.showFileError = true;
        }
      } catch (err) {
        this.showFileError = true;

        console.error(err)
      }
    },
    async validateForm(){      
      const valid = await this.$refs.formDocuments?.validate()
      this.$emit("valid", valid.valid)
    },    
    emitData() {   
      this.$emit("update:modelValue", {
        comment: this.localComment,
        email_cert: this.localEmail,
        ident_fiscal: this.ident_fiscal,
        documents: this.items.filter(i => i.checked),
        any_cert: this.items.some(x => x.checked)
      })
      this.$nextTick(() => this.validateForm())
    }
  },
  computed: {
    t() {
      return useT().t
    },
    selectedCertificates() {
      return this.items.some(x => x.checked)
  
    }
  },
  async mounted () {
    this.ident_fiscal.type = "Identificación fiscal"

    const masterE = useMaster() 
    try {
      const rpta = await masterE.get_all_values_code('certificates')
      const values = rpta?.response?.[0]?.rel_master_values ?? []
      this.items = values.map(e =>{
        let dinit = new Documents()
        dinit.type = e.name
        return {
        checked: false,
        label: e.label,
        name: e.name,
        id: e.id,
        data: dinit
        }
      })

    } catch (e) {
      console.error('error:', e)
    }
  },
  watch: {    
    items: {
      handler() {       
        this.emitData()
        this.$nextTick(() => this.validateForm())
      },
      deep: true
    },
    localComment() {
      this.emitData()
    },
    localEmail() {
      this.emitData()
    },
    ident_fiscal: {
      handler() {
        this.emitData()
      },
      deep: true
    },
    email_cert: {
      immediate: true,
      handler(val) {
        this.localEmail = val
      }  
    }
    
    
  }

}


</script>