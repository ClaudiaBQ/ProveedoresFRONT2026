<template>
    
    <v-card class="ma-3 pa-2">
      <v-row justify="space-between">
        <v-col>
          <h2 class="card-subtitle mt-3">{{ t('addresses') }}</h2>          
          <v-alert v-if="items.length === 0" border="start" variant="outlined" border-color="error"  style="border-color: gainsboro" icon="mdi-information-outline" class="mt-2 mb-9" density="compact">
            {{ t('mustAddAtLeastOneDir') }}
          </v-alert>
        </v-col>
        <v-col cols="3">
          <v-btn
              class="mt-3"
              prepend-icon="mdi-plus"
              :text="t('add') + ' ' + t('addresses') "
              @click="add"
              color="primary"
              variant="elevated"
            ></v-btn>
        </v-col>
      </v-row>    
      
      <v-data-table class="mt-5" :items="items" :headers="headers" :no-data-text="t('noData')" v-if="items.length != 0">      
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
        :subtitle="isEditing ? t('update') + ' ' +  t('addresses') : t('create') + ' '+ t('addresses')"
        :title="isEditing ? t('edit') + ' ' + t('addresses') : t('add') + ' ' +  t('addresses') "
        prepend-icon="mdi-store-outline"
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
          <v-form ref="formDir">               

                <h4>{{ t('sucursalName') }} <small class="required">{{ t('required') }}</small></h4>  
                <v-text-field 
                  variant="outlined" 
                  v-model="data.name" 
                  :placeholder="t('writeYourAnswer')" 
                  :rules="[rules.required, rules.maxLength(40)]"
                  required>      
                </v-text-field>
                 <v-checkbox 
                  :label="t('principal')"
                  variant="outlined" 
                  v-model="data.principal" 
                  :placeholder="t('writeYourAnswer')" >
                </v-checkbox>
                <v-row>
                    <v-col>
                        <h4>{{ t('street') }} <small class="required">{{ t('required') }}</small></h4>  
                        <v-text-field 
                        variant="outlined" 
                        v-model="data.street" 
                        :counter="60"
                        :placeholder="t('writeYourAnswer')" 
                        :rules="[rules.required, rules.maxLength(60)]"
                        >      
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <h4>{{ t('number') }} <small class="required">{{ t('required') }}</small></h4>  
                        <v-text-field 
                        variant="outlined" 
                        v-model="data.number" 
                        :counter="20"
                        :rules="[rules.required, rules.maxLength(20)]"
                        :placeholder="t('writeYourAnswer')"                   
                        >      
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <h4>{{ t('postalCode') }} <small class="required">{{ t('required') }}</small></h4>  
                        <v-text-field 
                        variant="outlined" 
                        :counter="10"
                        v-model="data.postal_code" 
                        :rules="[rules.required, rules.maxLength(10)]"
                        :placeholder="t('writeYourAnswer')"                   
                        >      
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                         <h4>{{ t('city') }} <small class="required">{{ t('required') }}</small></h4>  
                        <v-text-field 
                        variant="outlined" 
                        v-model="data.city" 
                        :counter="40"
                        :placeholder="t('writeYourAnswer')" 
                        :rules="[rules.required, rules.maxLength(40)]"                  
                        >      
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <h4>{{ t('country') }} <small class="required">{{ t('required') }}</small></h4>  
                        <v-select
                        v-model="data.country"
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
                        <h4>{{ t('region') }} <small class="required">{{ t('required') }}</small></h4>  
                        <v-select
                            v-model="data.region"
                            :placeholder="t('selectOption')"
                            :items="master.mFilter('regions', data.country)"  
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
                        <h4>{{ t('comment') }}s</h4> 
                        <v-textarea
                            v-model="data.comments"
                            :counter="50"
                            maxlength="50"
                            rows="2"
                            auto-grow
                            variant="outlined"
                            dense
                            :rules="[rules.maxLength(50)]"
                        ></v-textarea>
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
const master = useMasterStore()
</script>
<script>
import { useT } from '~/composables/useT'
import Directions from '~/models/Directions.js'


export default {
  name: 'Directions',
  components: {},
  data () {
    return {       
      data: null,      
      dialog: false,
      isEditing: false,
      items: [],
      rules: {
        required: v => !!v ||  this.t('required'),
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
    'items.length'(val) {
      this.$emit('valid', val > 0, 'valid_dir')
    },
    items: {
      handler (val) {
        this.$emit('update:modelValue', val)
      },
      deep: true
    }
  },
  methods: { 
    add(){
      this.show= false;
      this.data = new Directions();
      this.dialog = true;
    },
    edit (id) {
      this.show= false;
      this.data = this.items.find(it => it.id === id);
      this.isEditing = true;
      this.dialog = true
    },
    remove (id) {
      const index = this.items.findIndex(it => it.id === id)
      this.items.splice(index, 1)
    },
    async save () {
      this.show = false;
      let valid = await this.$refs.formDir.validate();
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
    }
  },
  computed: {
    t() {
      return useT().t
    },
    headers() {
      return [
        { title:  this.t('sucursalName'), key: 'name' },  
        { title:  this.t('street'), key: 'street' },  
        { title:  this.t('city'), key: 'city' },         
        { title:  this.t('country'), key: 'country' },  
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
        }
    }
  },
  mounted () {

  }
}


</script>