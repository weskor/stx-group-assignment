import { shallowMount, mount } from '@vue/test-utils'
import InputDate from '@/components/InputDate.vue'

describe('InputDate.vue', () => {
  it('Props checking', () => {
    const wrapper = shallowMount(InputDate, {
      propsData: { 
        value: '10/12/2020',
        label: 'Input date'
      }
    })
    expect(wrapper.props().value).toBe('10/12/2020')
    expect(wrapper.props().label).toBe('Input date')
    expect(wrapper.find('label').text()).toBe('Input date')
    expect(wrapper.find('label').exists).toBeTruthy
    expect(wrapper.find('input').exists).toBeTruthy
  })

  it('Input checking', async () => {
    const wrapper = mount(InputDate, {
      propsData: { 
        value: '10/12/2020'
      }
    })

    expect((wrapper.vm as any).selectedDate).toBe('10/12/2020')

    wrapper.setProps({ value: '11/12/2020' })
    expect(wrapper.props().value).toBe('11/12/2020')

    const input = wrapper.find('input').element as HTMLInputElement
    input.value = '13/12/2020';
    
    wrapper.find('input').trigger('input')    
    setTimeout(() => {
      expect((wrapper.vm as any).selectedDate).toBe('13/12/2020')
    }, 0)
  })
})