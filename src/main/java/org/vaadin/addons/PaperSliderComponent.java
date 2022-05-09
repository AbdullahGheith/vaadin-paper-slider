package org.vaadin.addons;

import com.vaadin.flow.component.AbstractField.ComponentValueChangeEvent;
import com.vaadin.flow.component.HasLabel;
import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.JsModule.Container;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Input;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.template.Id;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.shared.Registration;

@Tag("paper-slider")
@Container ({@JsModule("@vaadin/polymer-legacy-adapter/style-modules.js"), @JsModule("./paper-slider.ts")})
class PaperSliderComponent extends LitTemplate implements HasValue<ComponentValueChangeEvent<Input, String>, String>, HasLabel {

	@Id("paperSlider")
	private Input input;

	@Id("label")
	private Label label;

	@Id("slider-value")
	private Div sliderValue;

	private Boolean sliderShown = false;

	public PaperSliderComponent(int currentValue) {
		setMin(0);
		setMax(100);
		input.setValue(String.valueOf(currentValue));
		input.setValueChangeMode(ValueChangeMode.EAGER);
		input.addValueChangeListener(event -> {
			if (sliderShown) {
				sliderValue.setText(event.getValue());
			}
		});
	}

	@Override
	public void setValue(String s) {
		input.setValue(s);
	}

	@Override
	public String getValue() {
		return input.getValue();
	}

	@Override
	public Registration addValueChangeListener(ValueChangeListener<? super ComponentValueChangeEvent<Input, String>> valueChangeListener) {
		return input.addValueChangeListener(valueChangeListener);
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

	@Override
	public void setLabel(String label) {
		if (label != null && !label.isEmpty()) {
			this.label.getStyle().set("display", "block");
			this.label.setText(label);
		} else {
			this.label.getStyle().set("display", "none");
			this.label.setText("");
		}
	}

	@Override
	public String getLabel() {
		return this.getElement().getProperty("label");
	}

	public void hideValueDiv() {
		sliderValue.getStyle().set("display", "none");
		sliderShown = false;
	}

	public void showValueDiv() {
		sliderValue.getStyle().set("display", "block");
		sliderValue.setText(input.getValue());
		sliderShown = true;
	}

	public void setMin(int min) {
		getElement().setProperty("min", min);
	}

	public void setMax(int max) {
		getElement().setProperty("max", max);
	}
}
