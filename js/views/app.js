var AppView = Backbone.View.extend({
	initialize: function () {
		this.template = _.template($('#tmpl_app').html());
		this.editor = new EditorView();
		this.inspector = new InspectorView();

		this.render();
	},

	events: {
		'click .run': 'run',
		'click .step': 'step'
	}, // TODO

	render: function () {
		this.$el.empty().append(this.template());
		this.$('.editor').empty().append(this.editor.$el);
		this.$('.inspector').empty().append(this.inspector.$el);
	},

	run: function () {
		var obj = ASSEMBLE(this.editor.getSource());
		this.inspector.setObjectCode(obj);
		EXECUTE(toByteArray(obj));
		Backbone.Events.trigger('app:redraw');
	},

	step: function () {
		STEP();
		Backbone.Events.trigger('app:redraw');
	}
});
