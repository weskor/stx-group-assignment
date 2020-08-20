import { shallowMount } from '@vue/test-utils'
import Button from '@/components/Button.vue'
import sinon from 'sinon';

describe('Button.vue', () => {
  it('Click the button', () => {
    const spy = sinon.spy()
    const wrapper = shallowMount(Button, {
      propsData: { 
        onClick: spy
      }
    })
    wrapper.find('button').trigger('click')
    expect(spy.called).toBeCalled
  })

  it('Button slot contains text', () => {
    const wrapper = shallowMount(Button, {
      propsData: { 
        onClick: () => ({})
      },
      slots: {
        default: 'This is a button' 
      }
    })
    expect(wrapper.text()).toBe('This is a button')
  })
})
