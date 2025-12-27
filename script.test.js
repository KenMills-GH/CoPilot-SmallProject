const { handleUsernameSubmit } = require("./script");

describe("handleUsernameSubmit", () => {
  let mockEvent;
  let mockUsernameInput;
  let mockParentElement;
  let mockMessageDiv;

  beforeEach(() => {
    // Setup DOM mocks
    mockParentElement = document.createElement("div");

    mockUsernameInput = document.createElement("input");
    mockUsernameInput.id = "username";
    mockParentElement.appendChild(mockUsernameInput);

    mockEvent = {
      preventDefault: jest.fn(),
    };

    // Mock document.getElementById
    document.getElementById = jest.fn((id) => {
      if (id === "username") return mockUsernameInput;
      if (id === "usernameMessage") {
        return mockParentElement.querySelector("#usernameMessage");
      }
      return null;
    });
  });

  afterEach(() => {
    mockMessageDiv = null;
  });

  describe("Valid usernames", () => {
    test("should accept username with uppercase, number, and special character", () => {
      mockUsernameInput.value = "Test1@";

      handleUsernameSubmit(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockUsernameInput.classList.contains("is-valid")).toBe(true);
      expect(mockUsernameInput.classList.contains("is-invalid")).toBe(false);
    });

    test("should accept username with multiple uppercase letters", () => {
      mockUsernameInput.value = "TEST1@abc";

      handleUsernameSubmit(mockEvent);

      expect(mockUsernameInput.classList.contains("is-valid")).toBe(true);
    });

    test("should accept username with all allowed special characters", () => {
      mockUsernameInput.value = "Test1@$!%*?&";

      handleUsernameSubmit(mockEvent);

      expect(mockUsernameInput.classList.contains("is-valid")).toBe(true);
    });

    test("should accept longer username meeting requirements", () => {
      mockUsernameInput.value = "ValidUser123@Test";

      handleUsernameSubmit(mockEvent);

      expect(mockUsernameInput.classList.contains("is-valid")).toBe(true);
    });

    test("should display success message for valid username", () => {
      mockUsernameInput.value = "Valid1@";

      handleUsernameSubmit(mockEvent);

      const messageDiv = mockParentElement.querySelector("#usernameMessage");
      expect(messageDiv.className).toBe("alert alert-success mt-3");
      expect(messageDiv.innerHTML).toContain("<strong>Success!</strong>");
      expect(messageDiv.innerHTML).toContain("Valid1@");
    });
  });

  describe("Invalid usernames", () => {
    test("should reject username without uppercase letter", () => {
      mockUsernameInput.value = "test1@";

      handleUsernameSubmit(mockEvent);

      expect(mockUsernameInput.classList.contains("is-invalid")).toBe(true);
      expect(mockUsernameInput.classList.contains("is-valid")).toBe(false);
    });

    test("should reject username without number", () => {
      mockUsernameInput.value = "Test@";

      handleUsernameSubmit(mockEvent);

      expect(mockUsernameInput.classList.contains("is-invalid")).toBe(true);
    });

    test("should reject username without special character", () => {
      mockUsernameInput.value = "Test1";

      handleUsernameSubmit(mockEvent);

      expect(mockUsernameInput.classList.contains("is-invalid")).toBe(true);
    });

    test("should reject username shorter than 5 characters", () => {
      mockUsernameInput.value = "T1@";

      handleUsernameSubmit(mockEvent);

      expect(mockUsernameInput.classList.contains("is-invalid")).toBe(true);
    });

    test("should reject username with exactly 4 characters", () => {
      mockUsernameInput.value = "T1@a";

      handleUsernameSubmit(mockEvent);

      expect(mockUsernameInput.classList.contains("is-invalid")).toBe(true);
    });

    test("should reject empty username", () => {
      mockUsernameInput.value = "";

      handleUsernameSubmit(mockEvent);

      expect(mockUsernameInput.classList.contains("is-invalid")).toBe(true);
    });

    test("should display error message for invalid username", () => {
      mockUsernameInput.value = "invalid";

      handleUsernameSubmit(mockEvent);

      const messageDiv = mockParentElement.querySelector("#usernameMessage");
      expect(messageDiv.className).toBe("alert alert-danger mt-3");
      expect(messageDiv.innerHTML).toContain(
        "<strong>Invalid Username!</strong>"
      );
      expect(messageDiv.innerHTML).toContain("at least 1 uppercase letter");
    });
  });

  describe("Message div handling", () => {
    test("should create message div if it does not exist", () => {
      mockUsernameInput.value = "Test1@";

      handleUsernameSubmit(mockEvent);

      const messageDiv = mockParentElement.querySelector("#usernameMessage");
      expect(messageDiv).not.toBeNull();
      expect(messageDiv.id).toBe("usernameMessage");
    });

    test("should reuse existing message div", () => {
      mockMessageDiv = document.createElement("div");
      mockMessageDiv.id = "usernameMessage";
      mockParentElement.appendChild(mockMessageDiv);

      mockUsernameInput.value = "Test1@";

      handleUsernameSubmit(mockEvent);

      const allMessageDivs =
        mockParentElement.querySelectorAll("#usernameMessage");
      expect(allMessageDivs.length).toBe(1);
    });

    test("should update message div class from error to success", () => {
      mockUsernameInput.value = "invalid";
      handleUsernameSubmit(mockEvent);

      let messageDiv = mockParentElement.querySelector("#usernameMessage");
      expect(messageDiv.className).toBe("alert alert-danger mt-3");

      mockUsernameInput.value = "Valid1@";
      handleUsernameSubmit(mockEvent);

      messageDiv = mockParentElement.querySelector("#usernameMessage");
      expect(messageDiv.className).toBe("alert alert-success mt-3");
    });
  });

  describe("CSS class toggling", () => {
    test("should remove is-invalid and add is-valid for valid username", () => {
      mockUsernameInput.classList.add("is-invalid");
      mockUsernameInput.value = "Test1@";

      handleUsernameSubmit(mockEvent);

      expect(mockUsernameInput.classList.contains("is-valid")).toBe(true);
      expect(mockUsernameInput.classList.contains("is-invalid")).toBe(false);
    });

    test("should remove is-valid and add is-invalid for invalid username", () => {
      mockUsernameInput.classList.add("is-valid");
      mockUsernameInput.value = "invalid";

      handleUsernameSubmit(mockEvent);

      expect(mockUsernameInput.classList.contains("is-invalid")).toBe(true);
      expect(mockUsernameInput.classList.contains("is-valid")).toBe(false);
    });
  });

  test("should always call preventDefault on event", () => {
    mockUsernameInput.value = "Test1@";

    handleUsernameSubmit(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
  });
});
