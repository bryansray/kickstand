var Member = Backbone.Model.extend({
});

var Members = Backbone.Collection.extend({
	model: Member
});

var MemberView = Backbone.View.extend({
	tagName: 'div',
	className: 'member',
	
	events: {
		'click': 'click',
		'click .actions .follow-up': 'followUp'
	},
	
	initialize: function() {
		this.render();
	},
	
	render: function() {
		var template = Handlebars.compile( $("#member-template").html() );
		var html = template(this.model.toJSON());
		
		this.$el.html(html);
		this.$el.addClass(this.model.get("role"));
		this.$el.addClass(this.model.get("team"));
		
		return this;
	},
	
	click: function() {
		this.$el.toggleClass("spoken");
		// this.$el.fadeOut(500, function() {
			// var element = $(this);

			// $(this).toggleClass("spoken")
			// $(this).fadeIn(700);
		// });
	},
	
	followUp: function(event) {
		this.$el.toggleClass("follow-up");
		
		event.stopPropagation();
		event.preventDefault();
	}
});

var MemberCollectionView = Backbone.View.extend({
	el: '#members-container',
	
	initialize: function() {
		this.collection.on('add', this.render, this);
		this.render();
	},
	
	render: function() {
		var that = this;
		_.each(this.collection.models, function(item) {
			that.renderMember(item);
		}, this);
		
		return this;
	},
	
	renderMember: function(member) {
		var memberView = new MemberView({ model: member });
		
		this.$el.append(memberView.render().el);
	}
});

$(document).ready(function() {
	var members = new Members;
	members.comparator = function(member) { return member.get("name"); }
	
	members.add( new Member({ id: 1, name: "Bryan Ray", role: "Developer", team: "Floating" }) );
	members.add( new Member({ id: 2, name: "Jason Jackson", role: "Developer", team: "AssemblyCode" }) );
	members.add( new Member({ id: 3, name: "Daniel Hamilton", role: "Developer", team: "Sync" }) );
	members.add( new Member({ id: 4, name: "Quentin Davis", role: "Developer", team: "Viewer" }) );

	members.add( new Member({ id: 5, name: "Will Meurer", role: "Designer", team: "Floating" }) );

	members.add( new Member({ id: 6, name: "Mike O'Neal", role: "Operations", team: "Release Management" }) );

	members.add( new Member({ id: 7, name: "Dave Bell", role: "QA", team: "Publisher" }) );
	members.add( new Member({ id: 8, name: "Johnny Russell", role: "QA", team: "Publisher" }) );
	members.add( new Member({ id: 9, name: "Mark Ingalls", role: "QA", team: "Viewer" }) );

	members.add( new Member({ id: 10, name: "David Trojanowski", role: "Support", team: "Support" }) );

	members.add( new Member({ id: 11, name: "Adam Condron", role: "Boss", team: "Floating" }) );
	members.add( new Member({ id: 12, name: "Trent Miskelly", role: "Boss" }) );

	var membersView = new MemberCollectionView({ collection: members });
});