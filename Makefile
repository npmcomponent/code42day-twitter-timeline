all: lint build

lint:
	@jshint index.js

build: components index.js twitter-timeline.css
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean lint build all
