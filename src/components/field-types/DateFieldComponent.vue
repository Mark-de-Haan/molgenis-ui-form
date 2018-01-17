<template>
  <validate :state="state" :custom="{'validate': isValidDate(localValue) && validate(field)}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <div class="input-group">
        <flat-pickr
          :id="field.id"
          v-model="localValue"
          :config="config"
          :name="field.id"
          class="form-control form-control-lg"
          :class="{ 'is-invalid' : state && (state.$touched || state.$submitted) && state.$invalid}"
          :aria-describedby="field.id + '-description'"
          :required="isRequired(field)"
          :disabled="field.disabled"
        >
        </flat-pickr>

        <div class="input-group-append">
          <button class="btn btn-outline-secondary btn-lg" type="button" title="Toggle" data-toggle>
            <i class="fa fa-calendar">
              <span aria-hidden="true" class="sr-only">Toggle</span>
            </i>
          </button>
          <button v-if="!isRequired(field)" class="date-field-clear-btn btn btn-outline-secondary btn-lg" type="button" title="Clear" data-clear>
            <i class="fa fa-times">
              <span aria-hidden="true" class="sr-only">Clear</span>
            </i>
          </button>
        </div>
      </div>

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <field-messages :name="field.id" :state="state" show="$touched || $submitted" class="form-control-feedback">
        <div slot="required">This field is required</div>
        <div slot="validate">Validation failed</div>
      </field-messages>

    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'
  import flatPickr from 'vue-flatpickr-component'
  import 'flatpickr/dist/flatpickr.css'
  import moment from 'moment'

  export default {
    name: 'DateFieldComponent',
    mixins: [VueForm],
    props: {
      value: {
        type: String,
        required: false
      },
      field: {
        type: Object,
        required: true
      },
      state: {
        type: Object,
        required: false
      },
      validate: {
        type: Function,
        required: true
      },
      isRequired: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        // Store a local value to prevent changing the parent state
        localValue: this.value,
        config: {
          wrap: true,
          allowInput: true
        }
      }
    },
    methods: {
      isValidDate (dateString) {
        const date = moment(dateString, 'YYYY-MM-DD', true)
        return date != null && date.isValid()
      }
    },
    watch: {
      localValue (value) {
        // Emit value changes to the parent (form)
        this.$emit('input', value)
        // Emit value changes to trigger the hooks.onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
      }
    },
    components: {
      flatPickr
    }
  }
</script>