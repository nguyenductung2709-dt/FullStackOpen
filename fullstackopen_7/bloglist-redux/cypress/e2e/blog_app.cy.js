describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      username: "ndt2709",
      password: "Tuanhoa",
      name: "Tung",
    };

    const user2 = {
      username: "ndt270905",
      password: "Tuanhoa",
      name: "TungNguyen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("ndt2709");
      cy.get("#password").type("Tuanhoa");
      cy.get("#login-button").click();
      cy.contains("blogs");
      cy.contains("Tung logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("invalid_username");
      cy.get("#password").type("invalid_password");
      cy.get("#login-button").click();
      cy.contains("wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "ndt2709", password: "Tuanhoa" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Cloud Computing");
      cy.get("#author").type("Tung");
      cy.get("#url").type("cloudcomputing.aalto.fi");
      cy.contains("create").click();
      cy.contains("Cloud Computing by Tung");
    });

    it("A blog can be deleted", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Cloud Computing");
      cy.get("#author").type("Tung");
      cy.get("#url").type("cloudcomputing.aalto.fi");
      cy.contains("create").click();
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.on("window:confirm", (str) => {
        expect(str).to.equal("Remove blog Cloud Computing by Tung");
        return true;
      });
      cy.contains("Deleted blog: Cloud Computing by Tung");
      cy.get("#blog-post").should("not.exist");
    });

    it("A blog can only be removed by owner", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Cloud Computing");
      cy.get("#author").type("Tung");
      cy.get("#url").type("cloudcomputing.aalto.fi");
      cy.contains("create").click();
      cy.contains("view").click();
      cy.contains("remove");
      cy.contains("logout").click();
      cy.contains("login").click();
      cy.get("#username").type("ndt270905");
      cy.get("#password").type("Tuanhoa");
      cy.get("#login-button").click();
      cy.contains("view").click();
      cy.contains("remove").should("not.exist");
    });

    it("sorts blogs based on likes", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Blog with second most likes");
      cy.get("#author").type("Tung");
      cy.get("#url").type("cloudcomputing.aalto.fi");
      cy.contains("create").click();
      cy.contains("view").click();
      cy.get("#like-button-1").click();
      cy.get("#like-button-1").click();

      cy.contains("new blog").click();
      cy.get("#title").type("Blog with most likes");
      cy.get("#author").type("Tung");
      cy.get("#url").type("cloudcomputing.aalto.fi");
      cy.contains("create").click();
      cy.contains("view").click();
      cy.get("#like-button-2").click();
      cy.get("#like-button-2").click();
      cy.get("#like-button-2").click();

      cy.wait(1000);

      cy.get("#all_blogs").then(($blogs) => {
        const sortedBlogs = $blogs.toArray().sort((a, b) => {
          const likesA = parseInt(a.querySelector(".likes").text());
          const likesB = parseInt(b.querySelector(".likes").text());
          return likesB - likesA;
        });

        cy.wrap(sortedBlogs[0]).contains("Blog with most likes by Tung");
        cy.wrap(sortedBlogs[1]).contains("Blog with second most likes by Tung");
      });
    });
  });
});
