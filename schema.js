const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLInt, 
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLSchema
} = require('graphql');

//launch tyle
const LaunchType = new GraphQLObjectType({
	name: 'Launch',
	fields: ()=>({
		flight_number:{type: GraphQLInt},
		mission_name:{type: GraphQLString},
		launch_year:{type: GraphQLString},
		launch_date_local:{type: GraphQLString},
		launch_sucess:{type: GraphQLBoolean},
		rocket:{type: RocketType}
	})
});

//rocket type
const RocketType = new GraphQLObjectType({
	name: 'Rocket',
	fields: ()=>({
		rocket_id:{type: GraphQLString},
		rocket_name:{type: GraphQLString},
		rocket_type:{type: GraphQLString}
	})
});

//root query
const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields: {
		launches: {
		type: new GraphQLList(LaunchType),
		  resolve(parent, args) {
			return axios
			 .get('https://api.spacexdata.com/v3/launches')
			  .then(res => res.data);
		  }
		}
	  }
	});

module.export = new GraphQLSchema({
	query: RootQuery
});