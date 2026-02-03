<template>
        <h2 class="card-title">{{ t('bankInformation') }}</h2>
        <v-alert v-if="items.length === 0" border="start" variant="outlined" border-color="error"  style="border-color: gainsboro" icon="mdi-information-outline" class="mb-3">
            {{ t('addBankAccountMessage') }}
        </v-alert>
   
        <v-data-table :items="items" :headers="headers" :no-data-text="t('noData')">
            <template v-slot:top>
                <v-toolbar style="background-color: white;">         
                    <v-btn
                        prepend-icon="mdi-plus"
                        rounded="lg"
                        :text="t('add') + ' ' + t('bankAccount')"
                        color="primary"
                        variant="elevated"
                        @click="add"
                    ></v-btn>
                </v-toolbar>
            </template>      
            <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-2 justify-end">
                <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>
                <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
                </div>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="70%" persistent>
            <v-card
            :subtitle="isEditing ? t('update') + ' ' +  t('bankAccount') : t('create') + ' '+ t('bankAccount')"
            :title="isEditing ? t('edit') + ' ' + t('bankAccount') : t('add') + ' ' +  t('bankAccount') "
            prepend-icon="mdi-bank-plus"
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
                    <v-form ref="formBankAccount">               
                        <v-row>
                            <v-col>
                            <h3 class="mt-3">{{ t('bank') }}</h3>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <h4>{{ t('bankAccountCountry') }} <small class="required">{{ t('required') }}</small></h4>
                                <v-select
                                v-model="data.bank_country"
                                :placeholder="t('selectOption')"
                                :items="master.m('country')"  
                                :item-title="item => t(item.label)" 
                                item-value="value" 
                                variant="outlined"
                                :rules="[rules.required]"
                                required
                                ></v-select>
                            </v-col>

                            <v-col>
                                <h4>{{ t('bank') }} <small class="required">{{ t('required') }}</small></h4>
                                <v-select
                                    v-model="data.bank_name"
                                    :placeholder="t('selectOption')"
                                    :items="master.m('bank_name')"  
                                    :item-title="item => t(item.label)" 
                                    item-value="value" 
                                    variant="outlined"
                                    :rules="[rules.required]"
                                    required
                                ></v-select>
                            </v-col>

                            <v-col >
                                <h4>{{ t('branch') }} <small class="required">{{ t('required') }}</small></h4>
                                <v-text-field
                                    variant="outlined"
                                    v-model="data.bank_code"
                                    :rules="[rules.required, rules.maxLength(80)]"
                                    :counter="80"                                
                                />
                            </v-col>
                        </v-row>
                        <v-divider class="my-2" />
                        <v-row>
                            <v-col>
                            <h3>{{ t('accountDetails') }}</h3>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <h4>{{ t('accountType') }} <small class="required" >{{ t('required') }}</small></h4>
                                <v-radio-group v-model="data.account_type" :rules="[rules.required]" >
                                    <v-radio :label="t('currentAccount')" value="Checking" />
                                    <v-radio :label="t('savingsAccount')" value="Savings" />
                                </v-radio-group>
                            </v-col>
                            <v-col>
                                <h4>{{ t('currency') }} <small class="required">{{ t('required') }}</small></h4>
                                <v-select
                                    v-model="data.coin"
                                    :placeholder="t('selectOption')"
                                    :items="master.m('coins')"  
                                    :item-title="item => t(item.label)" 
                                    item-value="value" 
                                    variant="outlined"
                                    :rules="[rules.required]"
                                    required
                                ></v-select>
                            </v-col> 
                             
                        </v-row>
                        <v-row>
                            <v-col>
                                <h4>{{ t('currentAccountNumber') }} </h4>
                                <p class="helper">{{ t('mustBeAlphanumeric')}}</p>  
                                <v-text-field variant="outlined" 
                                    v-model="data.bank_account" 
                                    :rules="[rules.required, rules.alphanumeric]"
                                >
                                </v-text-field>
                                
                            </v-col>
                             <v-col>
                                <h4>{{ t('swiftBic') }} <small class="required">{{ t('required') }}</small></h4>
                                <p class="helper" style="margin-bottom: 10px;">
                                    {{ t('betweenDigits', { min: 8, max: 11 }) }}
                                </p>
                                <v-text-field variant="outlined" v-model="data.swift"                                  
                                :rules="[rules.required, rules.maxLength(11), rules.minLength(8)]"
                                :counter="11"
                                />
                            </v-col>                                      
                        </v-row>                       
                        <template v-if="isInclude('SEPA', data.bank_country)">
                            <v-row>
                                <v-col >
                                    <h4>IBAN <small class="required">{{ t('required') }}</small></h4>
                                    <v-text-field variant="outlined" v-model="data.iban"                                  
                                    :rules="[rules.required]"
                                    />
                                </v-col>
                                <v-col>  
                                    <h4>{{ t('controlKey') }} <small class="required">{{ t('required') }}</small></h4>
                                    <v-text-field variant="outlined" v-model="data.control_key"  required />
                                </v-col>                            
                            </v-row>
                        </template>
                        
                        <template v-if="isInclude('ABA', data.bank_country)">
                            <v-row >
                                <v-col>    
                                    <h4>ABA / Routing Number <small class="required">{{ t('required') }}</small></h4>
                                    <p class="helper" style="margin-bottom: 10px;">
                                        {{ t('digits', { count: 9 }) }}
                                    </p>
                                    <v-text-field 
                                    :counter="9"
                                    :rules="[rules.maxLength(9), rules.number]"
                                    variant="outlined" 
                                    v-model="data.aba" 
                                    />
                                </v-col>   
                            </v-row>
                        </template>                        
                        <template v-if="isInclude('CLABE', data.bank_country)">
                            <v-row>
                                <v-col>  
                                    <h4>CLABE <small class="required">{{ t('required') }}</small></h4>
                                    <p class="helper" style="margin-bottom: 10px;">
                                        {{ t('digits', { count: 18 }) }}
                                    </p>
                                    <v-text-field variant="outlined" 
                                    v-model="data.clabe"
                                    :rules="[rules.maxLength(18), rules.number]"
                                    :counter="18"
                                    required />
                                </v-col>   
                            </v-row>
                        </template>
                        
                        <template v-if="isInclude('CCI', data.bank_country)">
                            <v-row >
                                <v-col>  
                                    <h4>CCI <small class="required">{{ t('required') }}</small></h4>
                                    <p class="helper" style="margin-bottom: 10px;">
                                        {{ t('onlyIn', { country: 'Perú' }) }}
                                    </p>
                                    <v-text-field variant="outlined" 
                                    v-model="data.cci" 
                                    :rules="[rules.number]"
                                    required />
                                </v-col>   
                            </v-row>
                        </template>
                        <v-row>
                            <v-col>
                               <h4>{{ t('accountOwnership') }} <span class="required">{{ t('required') }}</span></h4>
                                <v-alert border="start" variant="outlined" border-color="info" style="border-color: gainsboro" icon="mdi-information-outline" class="mb-3">
                                    <ul>
                                        <li>{{ t('accountOwnership_1') }}</li>
                                        <li>{{ t('accountOwnership_2') }}</li>
                                        <li>{{ t('accountOwnership_3') }}</li>
                                        <li>{{ t('accountOwnership_4') }}</li>
                                    </ul>
                                </v-alert>
                            
                                <v-file-input 
                                :label="t('attachFile')"

                                variant="outlined" 
                                dense 
                                :rules="[rules.required]"
                                @update:modelValue="file => handleUpload(file, data)"
                                ></v-file-input>
                            </v-col>
                        </v-row>
                        
                        
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
import {useConfStore} from '~/stores/configuration'

const master = useMasterStore()
const config = useConfStore()

const isInclude = (type, country) => {
  if(country){
    const countries = config.load(type)
    if(countries)
        return countries.includes(country.toUpperCase())
  }
  return false
  
}

</script>

<script>
import { useT } from '~/composables/useT'
import { useEgnyte } from "@/composables/services/egnyte.js"
import BankAccount from '~/models/BankAccount.js'

export default {
  name: 'BankAccounts',
  components: {},
  data () {
    return {      
      data: null,      
      dialog: false,
      isEditing: false,
      items: []          
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
      this.$emit('valid', val > 0)
    }
  },
  methods: { 
    add(){
      this.data = new BankAccount();
      this.dialog = true;
    },
    edit (id) {
      this.data = this.items.find(it => it.id === id);
      this.dialog = true
    },
    remove (id) {
      const index = this.items.findIndex(it => it.id === id)
      this.items.splice(index, 1)
    },
    async save () {
        let valid = await this.$refs.formBankAccount.validate();
        if (!valid.valid) { 
            this.show= true;
        }
        else{   
            if (this.isEditing) {
                const index = this.items.findIndex(it => it.id === this.data.id)
                this.items[index] = this.data
            } else {
                if(this.items == []){
                this.data.id = this.items.length + 1
                }else{
                this.data.id = 0
                }
                this.items.push(this.data)
            }

            this.dialog = false
        }
    },
    async handleUpload(file, info) {      
      if (!file) return

      const { upload_file } = useEgnyte()
      let now = new Date()
      let nameFile = now.toISOString().split("T")[0] + "-" + String(now.getSeconds()).padStart(2, "0") + "_" + data.bank_name
      try {
        const res = await upload_file(
          this.code,   
          nameFile,         
          file               
        )
        if (res.status){
          info.file_id_egnyte = res.response.group_id
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
  computed: {
    t() {
      return useT().t
    },
    headers() {
      return [
        { title:  this.t('bankAccountCountry'), key: 'bank_country' },  
        { title:  this.t('bank'), key: 'bank_name' },  
        { title:  this.t('currentAccountNumber'), key: 'bank_account' },
        { title: this.t('actions'), key: 'actions', align: 'end', sortable: false }  
      ]
    },
    rules() {
        return {
            required: v => !!v ||  this.t('required'),
            minLength: n => v =>
            (v && v.length >= n) || this.t('rules_minLength'),
            maxLength: max => v =>
            (!v || v.length <= max) || this.t('rules_maxLength', {max}),
            email_sampol: v => (/^[^\s@]+@(sampol\.com|sampoldistribucion\.es)$/i.test(v)) || this.t('rules_emailSampol'),
            number: v => !v || /^\d+$/.test(String(v)) || this.t('onlyNumbersAllowed'),
            alphanumeric: v => /^[a-zA-Z0-9]+$/.test(v) || this.t('mustBeAlphanumeric')
        }
    }
  },
  mounted () {

  }
}


</script>