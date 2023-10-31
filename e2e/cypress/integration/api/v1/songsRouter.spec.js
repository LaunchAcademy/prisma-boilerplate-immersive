/// <reference types="Cypress" />

import albumJson from "../../../fixtures/album.json";
import songJson from "../../../fixtures/song.json";
import userJson from "../../../fixtures/user.json";

context("/api/v1/songsRouter", () => {
  let songId;
  beforeEach(() => {
    cy.task("db:truncate", ["Album", "Song", "User"]);
    cy.task("db:insert", {
      modelName: "User",
      data: {
        ...userJson,
        albums: {
          create: {
            ...albumJson,
            songs: {
              create: songJson,
            },
          },
        },
      },
    });
    cy.task("db:find", { modelName: "Song", conditions: { name: songJson.name } }).then((song) => {
      songId = song[0].id;
    });
  });

  describe("DELETE /songs/:id", () => {
    context("when a user is signed in", () => {
      context("delete successfully", () => {
        beforeEach(() => {
          cy.login(userJson);
        });

        it("returns the correct status", () => {
          cy.request({
            method: "DELETE",
            url: `/api/v1/songs/${songId}`,
            failOnStatusCode: false,
          })
            .its("status")
            .should("be.equal", 200);
        });

        it("returns a message", () => {
          cy.request({
            method: "DELETE",
            url: `/api/v1/songs/${songId}`,
            failOnStatusCode: false,
          }).should((response) => {
            expect(response.body.message).to.be.equal("song deleted");
          });
        });
      });
    });

    context("when a user is not signed in", () => {
      context("delete unsuccessful", () => {
        it("returns the correct status", () => {
          cy.request({
            method: "DELETE",
            url: `/api/v1/songs/${songId}`,
            failOnStatusCode: false,
          })
            .its("status")
            .should("be.equal", 401);
        });

        it("returns a message", () => {
          cy.request({
            method: "DELETE",
            url: `/api/v1/songs/${songId}`,
            failOnStatusCode: false,
          }).should((response) => {
            expect(response.body.message).to.be.equal("must be signed in");
          });
        });
      });
    });
  });

  describe("PATCH /songs/:id", () => {
    context("when a user is signed in", () => {
      beforeEach(() => {
        cy.login(userJson);
      });

      context("patch successfully", () => {
        it("returns the correct status", () => {
          cy.request({
            method: "PATCH",
            url: `/api/v1/songs/${songId}`,
            body: { description: "is dope", plays: 13 },
            failOnStatusCode: false,
          })
            .its("status")
            .should("be.equal", 200);
        });

        it("returns the updated song", () => {
          cy.request({
            method: "PATCH",
            url: `/api/v1/songs/${songId}`,
            body: { description: "is dope", plays: 13 },
            failOnStatusCode: false,
          }).should((response) => {
            expect(response.body.song).to.have.property("description", "is dope");
            expect(response.body.song).to.have.property("plays", 13);
          });
        });
      });

      context("patch unsuccessfully", () => {
        // waiting for error handling/ validation pattern
      });
    });

    describe("when a user is not signed in", () => {
      it("returns an unauthorized error status", () => {
        cy.request({
          method: "PATCH",
          url: `/api/v1/songs/${songId}`,
          body: { description: "is dope", plays: 13 },
          failOnStatusCode: false,
        })
          .its("status")
          .should("be.equal", 401);
      });

      it("returns an unauthorized error message", () => {
        cy.request({
          method: "PATCH",
          url: `/api/v1/songs/${songId}`,
          body: { description: "is dope", plays: 13 },
          failOnStatusCode: false,
        }).should((response) => {
          expect(response.body.message).to.be.equal("must be signed in");
        });
      });
    });
  });
});
