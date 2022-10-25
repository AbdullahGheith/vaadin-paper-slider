package org.vaadin.addons;

import com.vaadin.flow.component.AbstractField.ComponentValueChangeEvent;
import com.vaadin.flow.component.ClientCallable;
import com.vaadin.flow.component.HasLabel;
import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.JsModule.Container;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.html.Input;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.template.Id;
import com.vaadin.flow.shared.Registration;

@Tag("paper-slider")
@Container ({@JsModule("./paper-slider.ts")})
@NpmPackage(value = "@material/slider", version = "14.0.0")
class PaperSliderComponent extends LitTemplate implements HasValue<ComponentValueChangeEvent<Input, Integer>, Integer>, HasLabel {

	@Id("paperSlider")
	private Input input;

	private Integer currentValue;

	ValueChangeListener<? super ComponentValueChangeEvent<Input, Integer>> valueChangeListener;

	private Boolean sliderShown = false;

	public PaperSliderComponent(Integer defaultValue, Integer min, Integer max) {
		setMin(min);
		setMax(max);
		setValue(defaultValue);
	}

	@Override
	public void setValue(Integer value) {
		currentValue = value;
		getElement().setProperty("value", value);
		getElement().callJsFunction("changeValue", value);
	}

	@Override
	public Integer getValue() {
		return currentValue;
	}

	@ClientCallable
	private void valueChangedEvent(Integer value) {
		if (valueChangeListener != null) {
			valueChangeListener.valueChanged(new ComponentValueChangeEvent<>(input, createHasValue(value), null, true));
			currentValue = value;
		}
	}

	public HasValue<?, Integer> createHasValue(Integer val){
		HasValue<?, Integer> newHasValue = new CustomField<>() {
			Integer value = val;
			@Override
			protected Integer generateModelValue() {
				return value;
			}

			@Override
			protected void setPresentationValue(Integer integer) {
				this.value = integer;
			}
		};
		newHasValue.setValue(val);
		newHasValue.setReadOnly(false);
		return newHasValue;
	}
	@Override
	public Registration addValueChangeListener(ValueChangeListener<? super ComponentValueChangeEvent<Input, Integer>> valueChangeListener) {
		this.valueChangeListener = valueChangeListener;
		return null;
	}

	@Override
	public void setReadOnly(boolean b) {
		input.setReadOnly(b);
	}

	@Override
	public boolean isReadOnly() {
		return input.isReadOnly();
	}

	@Override
	public void setRequiredIndicatorVisible(boolean b) {
		input.setRequiredIndicatorVisible(b);
	}

	@Override
	public boolean isRequiredIndicatorVisible() {
		return input.isRequiredIndicatorVisible();
	}

	public void setDisabled(boolean disabled){
		input.setEnabled(!disabled);
		getElement().setProperty("isDisabled", disabled);
	}

	public void hideValueWhenSliding() {
		getElement().setProperty("showValue", false);
		getElement().callJsFunction("render");
	}

	public void showValueWhenSliding() {
		getElement().setProperty("showValue", true);
	}

	public void setMin(Integer min) {
		getElement().setProperty("min", min);
	}

	public void setMax(Integer max) {
		getElement().setProperty("max", max);
	}

	public void setStep(Integer step) {
		if (step != null)
			getElement().setProperty("step", step);
		else
			getElement().removeProperty("step");
	}

	public void setPrimaryColor(String color) {
		getElement().setProperty("primarycolor", color);
	}
}
