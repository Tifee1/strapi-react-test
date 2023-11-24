// "use strict";

module.exports = {
  beforeCreate: async (event) => {
    console.log("before create:", event);
  },
  afterCreate: async (event) => {
    const { result, params } = event;

    console.log("afterCreate:", event.model.attributes);

    // Automatically create a comment
    const comment = await strapi.entityService.create("api::comment.comment", {
      data: {
        description: result.title,
        publishedAt: Date.now(),
      },
    });

    const ticket = await strapi.entityService.create("api::ticket.ticket", {
      data: {
        price: 100,
        name: result.title,
        status: "active",
        publishedAt: Date.now(),
      },
    });
    console.log(comment);

    await strapi.entityService.update("api::comment.comment", comment.id, {
      data: { ticket: ticket.id },
    });

    await strapi.entityService.update("api::post.post", result.id, {
      data: {},
    });
  },
};
