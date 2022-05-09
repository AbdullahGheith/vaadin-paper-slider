package org.vaadin.addons;

import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.html.Input;
import com.vaadin.flow.shared.Registration;

public class PaperSlider extends CustomField<Integer>
{
	PaperSliderComponent component;

	PaperSlider self = this;
	private Integer oldValue;

	public PaperSlider(Integer defaultValue) {
		super(defaultValue);

		component = new PaperSliderComponent(defaultValue);
		add(component);

		getElement().setProperty("value", defaultValue);
		this.oldValue = defaultValue;
	}

	public void setMin(int min) {
		component.setMin(min);
	}

	public void setMax(int max) {
		component.setMax(max);
	}

	public void showValues(){
		component.showValueDiv();
	}

	public void hideValues(){
		component.hideValueDiv();
	}

	@Override
	protected Integer generateModelValue() {
		return Integer.valueOf(component.getValue());
	}

	@Override
	protected void setPresentationValue(Integer integer) {
		component.setValue(String.valueOf(integer));
	}

	@Override
	public Integer getValue(){
		return Integer.valueOf(component.getValue());
	}


	@Override
	public String getLabel() {
		return component.getLabel();
	}


	@Override
	public void setLabel(String label) {
		component.setLabel(label);
	}

	@Override
	public Registration addValueChangeListener(ValueChangeListener<? super ComponentValueChangeEvent<CustomField<Integer>, Integer>> listener) {
		ValueChangeListener<ComponentValueChangeEvent<Input, String>> proxyListener = new ValueChangeListener<>() {
			@Override
			public void valueChanged(ComponentValueChangeEvent<Input, String> inputStringComponentValueChangeEvent) {
				HasValue<?, String> oldHasValue = inputStringComponentValueChangeEvent.getHasValue();
				HasValue<?, Integer> newHasValue = new CustomField<>() {
					Integer value;
					@Override
					protected Integer generateModelValue() {
						return value;
					}

					@Override
					protected void setPresentationValue(Integer integer) {
						this.value = integer;
					}
				};
				newHasValue.setValue(Integer.parseInt(oldHasValue.getValue()));
				newHasValue.setReadOnly(oldHasValue.isReadOnly());
				listener.valueChanged(new ComponentValueChangeEvent<>(self, newHasValue, oldValue, false));
				oldValue = newHasValue.getValue();
			}
		};

		return component.addValueChangeListener(proxyListener);
	}

//	@Override
//	public Registration addValueChangeListener(ValueChangeListener<? super ComponentValueChangeEvent<PaperSlider, Integer>> valueChangeListener) {
//		ValueChangeListener<ComponentValueChangeEvent<Input, String>> proxyListener = new ValueChangeListener<>() {
//			@Override
//			public void valueChanged(ComponentValueChangeEvent<Input, String> inputStringComponentValueChangeEvent) {
//				HasValue<?, String> oldHasValue = inputStringComponentValueChangeEvent.getHasValue();
//				HasValue<?, Integer> newHasValue = new CustomField<>() {
//					Integer value;
//					@Override
//					protected Integer generateModelValue() {
//						return value;
//					}
//
//					@Override
//					protected void setPresentationValue(Integer integer) {
//						this.value = integer;
//					}
//				};
//				newHasValue.setValue(Integer.parseInt(oldHasValue.getValue()));
//				newHasValue.setReadOnly(oldHasValue.isReadOnly());
//				valueChangeListener.valueChanged(new ComponentValueChangeEvent<>(self, newHasValue, oldValue, false));
//				oldValue = newHasValue.getValue();
//			}
//		};
//
//		return input.addValueChangeListener(proxyListener);
//	}

	@Override
	public void setReadOnly(boolean b) {
		component.setReadOnly(b);
	}

	@Override
	public boolean isReadOnly() {
		return component.isReadOnly();
	}

	@Override
	public void setRequiredIndicatorVisible(boolean b) {
		component.setRequiredIndicatorVisible(b);
	}

	@Override
	public boolean isRequiredIndicatorVisible() {
		return component.isRequiredIndicatorVisible();
	}
}
