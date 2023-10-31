/// <reference types="Cypress" />

import albumJson from "../fixtures/album.json";
import userJson from "../fixtures/user.json";

describe("db plugin actions", () => {
  let albumId;
  beforeEach(() => {
    cy.task("db:truncate", ["Album", "User"]);
    cy.task("db:insert", {
      modelName: "User",
      data: {
        ...userJson,
        albums: {
          create: [
            albumJson,
            {
              name: "New Album",
            },
          ],
        },
      },
    });
    cy.task("db:find", { modelName: "Album", conditions: { name: albumJson.name } }).then(
      (album) => {
        albumId = album[0].id;
      }
    );
  });

  describe("update action", () => {
    context("update one record", () => {
      const newName = "Test test";
      let updatedAlbumName;
      beforeEach(() => {
        cy.task("db:update", {
          modelName: "Album",
          conditions: { id: albumId },
          data: { name: newName },
        });
        cy.task("db:find", { modelName: "Album", conditions: { id: albumId } }).then((album) => {
          updatedAlbumName = album[0].name;
        });
      });

      it("can update one record", () => {
        expect(updatedAlbumName).to.be.equal(newName);
      });
    });

    context("update many records", () => {
      let firstAlbumId;
      let firstPrevAlbumImage;
      let firstNewAlbumImage;

      let secondAlbumId;
      let secondPrevAlbumImage;
      let secondNewAlbumImage;
      beforeEach(() => {
        cy.task("db:find", { modelName: "Album" }).then((albums) => {
          firstAlbumId = albums[0].id;
          firstPrevAlbumImage = albums[0].image;
          secondAlbumId = albums[1].id;
          secondPrevAlbumImage = albums[1].image;
        });

        cy.task("db:update", {
          modelName: "Album",
          conditions: { image: null },
          data: { image: "google.com" },
        });
        cy.task("db:find", { modelName: "Album", conditions: { id: firstAlbumId } }).then(
          (albums) => {
            firstNewAlbumImage = albums[0].image;
          }
        );
        cy.task("db:find", { modelName: "Album", conditions: { id: secondAlbumId } }).then(
          (albums) => {
            secondNewAlbumImage = albums[0].image;
          }
        );
      });

      it("can update many records", () => {
        expect(firstPrevAlbumImage).to.be.equal(null);
        expect(firstNewAlbumImage).to.be.equal("google.com");

        expect(secondPrevAlbumImage).to.be.equal(null);
        expect(secondNewAlbumImage).to.be.equal("google.com");
      });
    });
  });

  describe("delete action", () => {
    let prevAlbumCount;
    let newAlbumCount;

    context("delete one record", () => {
      beforeEach(() => {
        cy.task("db:find", { modelName: "Album" }).then((albums) => {
          prevAlbumCount = albums.length;
        });

        cy.task("db:delete", { modelName: "Album", conditions: { id: albumId } });

        cy.task("db:find", { modelName: "Album" }).then((albums) => {
          newAlbumCount = albums.length;
        });
      });

      it("can delete one record", () => {
        expect(newAlbumCount).to.be.equal(prevAlbumCount - 1);
      });
    });

    context("delete many records", () => {
      beforeEach(() => {
        cy.task("db:find", { modelName: "Album" }).then((albums) => {
          prevAlbumCount = albums.length;
        });

        cy.task("db:delete", { modelName: "Album" });

        cy.task("db:find", { modelName: "Album" }).then((albums) => {
          newAlbumCount = albums.length;
        });
      });

      it("can delete many records", () => {
        expect(newAlbumCount).to.be.equal(prevAlbumCount - 2);
      });
    });
  });
});
