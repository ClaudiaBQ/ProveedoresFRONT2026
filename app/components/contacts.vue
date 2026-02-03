<template>
  <v-card class="ma-3 pa-2">
    <v-row justify="space-between">
      <v-col>
          <h2 class="card-subtitle mt-3">{{ t('contactPerson') }}</h2>         
          <v-alert v-if="items.length === 0" border="start" variant="outlined" border-color="error"  style="border-color: gainsboro" density="compact" icon="mdi-information-outline" class="mt-2 mb-9">
            {{ t('mustAddAtLeastOneContact') }}
          </v-alert>
      </v-col>
      <v-col cols="3">
        <v-btn
          class="mt-3"
          prepend-icon="mdi-plus"
          :text="t('addContact')"
          @click="add"
          color="primary"
          variant="elevated"
        ></v-btn>
      </v-col>
    </v-row>       
   
    <v-data-table  class="mt-5" :items="items" :headers="headers" :no-data-text="t('noData')" v-if="items.length != 0">          
      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
        </div>
      </template>
    </v-data-table>
  </v-card>

    <v-dialog v-model="dialog" max-width="60%" persistent>
      <v-card
        :subtitle="isEditing ? t('update') + ' ' +  t('contact') : t('create') + ' '+ t('contact')"
        :title="isEditing ? t('edit') + ' ' + t('contact') : t('add') + ' ' +  t('contact') "
        prepend-icon="mdi-account-plus-outline"
      >
        <v-card-text>
          <v-snackbar
            v-model="show"
            :timeout="3000"
            location="top"
            color="error"
            min-height="90px"
            timer
          >
            <v-icon>mdi-alert-circle-outline</v-icon>
            {{t('fixFormFieldsTryAgain')}}
          </v-snackbar>
          <v-form ref="formC">
                <h4>{{ t('contactType') }} <small class="required">{{ t('required') }}</small></h4>  
                <v-select
                  v-model="data.type"
                  :placeholder="t('selectOption')"
                  :items="master.m('type_contact')"  
                  :item-title="item => t(item.label)" 
                  item-value="value" 
                  variant="outlined"
                  :rules="[rules.required]"
                  required
                ></v-select>
                <v-checkbox 
                  :label="t('principal')"
                  variant="outlined" 
                  v-model="data.principal" 
                  :placeholder="t('writeYourAnswer')" >
                </v-checkbox>
                <v-row>
                  <v-col>
                    <h4>{{ t('name') }} <small class="required">{{ t('required') }}</small></h4>  
                    <v-text-field 
                      variant="outlined" 
                      v-model="data.name" 
                      :placeholder="t('writeYourAnswer')" 
                      :rules="[rules.required]"
                      required>      
                    </v-text-field>
                  </v-col>
                  <v-col>
                     <h4>{{ t('lastName') }} <small class="required">{{ t('required') }}</small></h4>  
                    <v-text-field 
                      variant="outlined" 
                      v-model="data.lastname" 
                      :placeholder="t('writeYourAnswer')" 
                      :rules="[rules.required]"
                      required>      
                    </v-text-field>
                  </v-col>
                </v-row>              

                <h4>{{ t('email') }} <small class="required">{{ t('required') }}</small></h4>  
                <v-text-field 
                  variant="outlined" 
                  v-model="data.email" 
                  :placeholder="t('writeYourAnswer')" 
                  :rules="[rules.required, rules.email]"
                >      
                </v-text-field>

                <h4>{{ t('phone') }}</h4>  
                <v-text-field 
                  variant="outlined" 
                  v-model="data.phone_number" 
                  :placeholder="t('writeYourAnswer')" 
                  :rules="[rules.number]"
                >      
                </v-text-field>

                <h4>{{ t('preferredLanguageForCommunication') }} <small class="required">{{ t('required') }}</small></h4>
                <v-radio-group v-model="data.prefered_lang" :rules="[rules.required]">
                  <v-radio color="#005CB9" :label="t('spanish')" value="0"></v-radio>
                  <v-radio color="#005CB9" :label="t('english')" value="1"></v-radio>
                  <v-radio color="#005CB9" :label="t('italian')" value="2"></v-radio>
                </v-radio-group>  
          </v-form>     
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="bg-surface-light">
          <v-btn :text="t('cancel')" variant="plain" @click="dialog = false"></v-btn>
          <v-spacer></v-spacer>
          <v-btn :text="t('save')" @click="save" color="primary"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { useMasterStore } from '~/stores/master'
const master = useMasterStore()
</script>
<script>
import { useT } from '~/composables/useT'
import Contacts from '~/models/Contacts.js'


export default {
  name: 'Contacts',
  components: {},
  data () {
    return {       
      data: null,      
      dialog: false,
      isEditing: false,
      items: [],
      rules: {
        required: v => !!v ||  this.t('required'),
        email: v => /.+@.+\..+/.test(v)|| this.t('emailMustBeValid'),
        number: v => !v || /^\d+$/.test(String(v)) || this.t('onlyNumbersAllowed')

      },
      show: false
    }
  },
  props: {
    modelValue: {
      type: Object,
      default: null
    }
  },
  watch:{
    items: {
      handler (val) {
        this.$emit('update:modelValue', val)
      },
      deep: true
    },
    'items.length'(val) {
      this.$emit('valid', val > 0, 'valid_cont')
    }
  },
  methods: { 
    add(){
      this.show= false;
      this.data = new Contacts();
      this.dialog = true;
    },
    edit (id) {
      this.show= false;
      this.data = this.items.find(it => it.id === id);
      this.dialog = true;
      this.isEditing = true;
    },
    remove (id) {
      const index = this.items.findIndex(it => it.id === id)
      this.items.splice(index, 1)
    },
    async save () {
      this.show = false;
      let valid = await this.$refs.formC.validate();
      if (!valid.valid) { 
        this.show= true;
      }
      else{        
        if (this.isEditing) {
          const index = this.items.findIndex(it => it.id === this.data.id)
          this.items[index] = this.data
        } else {
          this.data.id = this.items.length > 0 ? this.items.length + 1 : 0
          this.items.push(this.data)
          
        }

        this.dialog = false
      }
    }
    
  },
  computed: {
    t() {
      return useT().t
    },
    headers() {
      return [
        { title:  this.t('name'), key: 'name' },  
        { title:  this.t('contactType'), key: 'type' },  
        { title:  this.t('email'), key: 'email' },  
        { title:  this.t('phone'), key: 'phone_number' },  
        { title: this.t('preferredLanguageForCommunication'), key: 'prefered_lang' },
        { title: this.t('actions'), key: 'actions', align: 'end', sortable: false }  
      ]
    }
  },
  mounted () {

  }
}


</script>