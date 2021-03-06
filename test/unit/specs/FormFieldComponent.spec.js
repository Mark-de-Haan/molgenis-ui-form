import FormFieldComponent from '@/components/FormFieldComponent'
import { mount, shallow } from 'vue-test-utils'

describe('FormFieldComponents unit tests', () => {
  const field = {
    id: 'string',
    type: 'text',
    validate: (data) => data['string'] === 'data',
    visible: () => true,
    required: () => true
  }

  const formState = {
    'string': {
      $touched: false,
      $submitted: false,
      $invalid: false,
      _addControl: () => {}
    }
  }

  const propsData = {
    formData: {'string': 'data'},
    field: field,
    formState: formState,
    showOptionalFields: true
  }

  const wrapper = shallow(FormFieldComponent, {
    propsData: propsData
  })

  describe('validate', () => {
    it('should succeed in validating a field', () => {
      expect(wrapper.vm.isValid).to.equal(true)
    })

    it('should fail in validating a field', () => {
      wrapper.setData({
        formData: {
          'string': 'not valid'
        }
      })
      expect(wrapper.vm.isValid).to.equal(false)
    })
  })

  describe('onDataChange', () => {
    it('should emit a dataChange event on dataChange', () => {
      wrapper.vm.onDataChange()
      expect(wrapper.emitted().dataChange[0]).to.deep.equal([])
    })
  })

  describe('isVisible', () => {
    it('should return true if schema-field visibility is set to true', () => {
      expect(wrapper.vm.isVisible).to.equal(true)
    })

    it('should return true if field is of type field-group', () => {
      const propsData = {
        formData: {},
        field: {
          id: 'group',
          type: 'field-group',
          visible: () => true,
          required: () => true,
          validate: () => true,
          children: [
            {
              id: 'string',
              type: 'text',
              visible: () => true,
              required: () => true,
              validate: () => true
            }
          ]
        },
        formState: formState,
        showOptionalFields: true
      }

      const wrapper = shallow(FormFieldComponent, {
        propsData: propsData
      })

      expect(wrapper.vm.isVisible).to.equal(true)
    })
  })

  describe('isRequired passed as true in component', () => {
    const wrapper = mount(FormFieldComponent, {
      propsData: propsData,
      stubs: {'fieldMessages': '<div>This field is required</div>'}
    })

    it('should return true if schema-field required is set to true', () => {
      expect(wrapper.vm.isRequired).to.equal(true)
    })

    it('should add the "required-field" class to the fieldset', () => {
      expect(wrapper.classes()).contain('required-field')
    })
  })

  describe('isRequired passed as false in component', () => {
    const field = {
      id: 'string',
      type: 'text',
      validate: (data) => data['string'] === 'data',
      required: () => false,
      visible: () => true
    }

    const propsData = {
      formData: {'string': 'data'},
      field: field,
      formState: formState,
      showOptionalFields: true
    }

    const wrapper = mount(FormFieldComponent, {
      propsData: propsData
    })

    it('should return false if schema-field required is set to false', () => {
      expect(wrapper.vm.isRequired).to.equal(false)
    })
  })

  describe('Hide optional fields', () => {
    const field = {
      id: 'string',
      type: 'text',
      validate: (data) => true,
      required: () => true,
      visible: () => true
    }

    const propsData = {
      formData: {'string': 'data'},
      field: field,
      formState: formState,
      showOptionalFields: false
    }

    const wrapper = mount(FormFieldComponent, {
      propsData: propsData
    })

    it('should be visible because field is required', () => {
      expect(wrapper.vm.isVisible).to.equal(true)
    })
  })
})
