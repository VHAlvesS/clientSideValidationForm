class FormValidator {
  constructor() {
    this.form = document.querySelector("#mainForm");
    this.inputs = Array.from(this.form.querySelectorAll("input, select"));
    this.submitButton = document.querySelector("#submit");

    // Event handlers
    this.submitButton.addEventListener("click", (e) => {
      this.formInit.bind(this, e)();
    });

    this.checkForElementsToSugets(this.inputs);
  }

  formInit(e) {
    const handleSubmit = (e) => {
      if (!validateForm()) {
        e.preventDefault();
      } else {
        console.log("dados enviados");
      }
    };

    const validateForm = () => {
      let finalOutput = [];
      this.inputs.map((element) => {
        finalOutput.push(validateInput(element));
      });

      for (const elemento of finalOutput) {
        if (elemento === false) {
          return false;
          break;
        }
      }

      return true;
    };

    const validateInput = (input) => {
      let finalValidatedOutput = true;
      if (input.id === "foundIn") {
        if (input.value === "none") {
          displayErrors(input);
          finalValidatedOutput = false;
        } else {
          input.classList.add("formSuccess");
          clearErrors(input);
        }
      }
      if (input.id === "name") {
        if (input.value === "" || input.value.length < 2) {
          displayErrors(input, ", você precisa colocar um nome valido.");
          finalValidatedOutput = false;
        } else {
          input.classList.add("formSuccess");
          clearErrors(input);
        }
      }
      if (input.id === "lastName") {
        if (input.value === "" || input.value.length < 2) {
          displayErrors(input, ", você precisa colocar um sobrenome valido.");
          finalValidatedOutput = false;
        } else {
          input.classList.add("formSuccess");
          clearErrors(input);
        }
      }
      if (input.id === "email") {
        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const re = regex.test(String(input.value).toLowerCase());
        if (re) {
          input.classList.add("formSuccess");
          clearErrors(input);
        } else {
          displayErrors(input, ", você precisa colocar um email valido.");
          finalValidatedOutput = false;
        }
      }
      if (input.id === "telephone") {
        const regex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/;
        const re = regex.test(String(input.value).toLowerCase());
        if (re) {
          input.classList.add("formSuccess");
          clearErrors(input);
        } else {
          displayErrors(input, ", você precisa colocar um numero valido.");
          finalValidatedOutput = false;
        }
      }
      if (input.id === "female" || input.id === "male") {
        if (
          (input.id === "female" && input.checked) ||
          input.parentElement.querySelector("#male").checked ||
          (input.id === "male" && input.checked) ||
          input.parentElement.querySelector("#female").checked
        ) {
          input.classList.add("formSuccess");
          clearErrors(input);
        } else {
          displayErrors(input, ", você precisa selecionar um genero.");
          finalValidatedOutput = false;
        }
      }
      if (input.id === "birthdate") {
        const inputDate = input.value.split("-");

        const actualDate = new Date();
        const actualYear = actualDate.getFullYear();
        const actualMonth = actualDate.getMonth() + 1;
        const actualDay = actualDate.getDate();

        if (actualDay && actualMonth && actualYear) {
          if (inputDate[0] < actualYear - 150 || inputDate[0] > actualYear) {
            displayErrors(input, ", você precisa colocar uma data valida.");
            finalValidatedOutput = false;
          } else {
            input.classList.add("formSuccess");
            clearErrors(input);
          }
        }
      }
      if (input.id === "street") {
        if (input.value === "" || input.value.length < 2) {
          displayErrors(input, ", você precisa colocar um endereço valido.");
          finalValidatedOutput = false;
        } else {
          input.classList.add("formSuccess");
          clearErrors(input);
        }
      }
      if (input.id === "postCode") {
        const regex = /^\d{5}-?\d{3}$/;

        const teste = regex.test(input.value);
        if (teste) {
          input.classList.add("formSuccess");
          clearErrors(input);
        } else {
          displayErrors(input, ", você precisa colocar um cep valido.");
          finalValidatedOutput = false;
        }
      }
      if (input.id === "houseNumber") {
        if (input.value === "" || input.value.length < 1) {
          displayErrors(input, ", você precisa colocar um numero valido.");
          finalValidatedOutput = false;
        } else {
          input.classList.add("formSuccess");
          clearErrors(input);
        }
      }
      if (input.id === "state" || input.id === "country") {
        const placesArr = this.checkForTheList(input.id, input);
        let stateCheck = false;
        if (placesArr) {
          placesArr.forEach((element) => {
            if (element.toLowerCase() === input.value.toLowerCase()) {
              stateCheck = true;
            }
          });
        }

        if (placesArr !== null) {
          if (!placesArr || input.value !== "") {
            input.id === "country"
              ? displayErrors(input, ", pais não fornecido.")
              : displayErrors(
                  input,
                  ", estado invalido ou pais não fornecido."
                );
            finalValidatedOutput = false;
          }
          if (input.value === "") {
            input.id === "country"
              ? displayErrors(input, ", campo vazio, forneça um pais.")
              : displayErrors(input, ", campo vazio, forneça um estado.");
            finalValidatedOutput = false;
          }
          if (stateCheck) {
            input.classList.add("formSuccess");
            clearErrors(input);
            finalValidatedOutput = true;
          }
        }
      }
      return finalValidatedOutput;
    };

    const displayErrors = (
      input,
      error = " verifique o conteudo posto no campo acima e tente novamente"
    ) => {
      const displayError = input.parentElement.querySelector(".error");
      input.classList.add("activeError");
      input.classList.remove("formSuccess");

      displayError.innerHTML = `Algo deu errado${error}`;
    };

    const clearErrors = (input) => {
      const displayError = input.parentElement.querySelector(".error");
      displayError.innerHTML = ``;
    };

    handleSubmit(e);
  }

  checkForTheList = function (inputId, input) {
    if (inputId === "country") {
      return [
        "Estados Unidos",
        "China",
        "Índia",
        "Rússia",
        "Indonésia",
        "Brasil",
        "Paquistão",
        "Nigéria",
        "Bangladesh",
        "México",
        "Japão",
        "Etiópia",
        "Filipinas",
        "Egito",
        "Vietnã",
        "República Democrática do Congo",
        "Alemanha",
        "Turquia",
        "Irã",
        "Tailândia",
        "Reino Unido",
        "França",
        "Itália",
        "Tanzânia",
        "África do Sul",
        "Mianmar",
        "Quênia",
        "Coreia do Sul",
        "Colômbia",
        "Espanha",
        "Argentina",
        "Argélia",
        "Sudão",
        "Ucrânia",
        "Iraque",
        "Afeganistão",
        "Polônia",
        "Canadá",
        "Marrocos",
        "Arábia Saudita",
        "Uzbequistão",
        "Peru",
        "Malásia",
        "Angola",
        "Moçambique",
        "Iêmen",
        "Gana",
        "Nepal",
        "Venezuela",
        "Madagascar",
      ];
    }

    if (
      inputId === "state" &&
      input.parentElement.parentElement
        .querySelector("#country")
        .value.toLowerCase() === "brasil"
    ) {
      return [
        "Acre",
        "Alagoas",
        "Amapá",
        "Amazonas",
        "Bahia",
        "Ceará",
        "Distrito Federal",
        "Espírito Santo",
        "Goiás",
        "Maranhão",
        "Mato Grosso",
        "Mato Grosso do Sul",
        "Minas Gerais",
        "Pará",
        "Paraíba",
        "Paraná",
        "Pernambuco",
        "Piauí",
        "Rio de Janeiro",
        "Rio Grande do Norte",
        "Rio Grande do Sul",
        "Rondônia",
        "Roraima",
        "Santa Catarina",
        "São Paulo",
        "Sergipe",
        "Tocantins",
      ];
    } else {
      return false;
    }
  };

  checkForElementsToSugets = (elementsArr) => {
    const checking = elementsArr.filter((element) => {
      return element.id === "state" || element.id === "country";
    });

    for (const element of checking) {
      element.addEventListener("input", (e) => {
        if (e.target.value !== "") {
          const items = this.checkForTheList(element.id, element);
          if (!items) {
            return;
          }

          const itemsToShow = items.filter((item) =>
            item.startsWith(
              e.target.value.charAt(0).toUpperCase() +
                e.target.value.toLowerCase().slice(1)
            )
          );

          displaySuggestedElement(itemsToShow, element);

          document.addEventListener("click", (e) => {
            if (!element.contains(e.target)) {
              element.parentElement.querySelector(".suggestionBox").innerHTML =
                "";
            }
          });

          element.addEventListener("blur", () => {
            setTimeout(function () {
              element.parentElement.querySelector(".suggestionBox").innerHTML =
                "";
            }, 1000);
          });
        }
      });
    }

    const displaySuggestedElement = function (elements, input) {
      const parent = input.parentElement;
      const suggestionElement = parent.querySelector(".suggestionBox");
      suggestionElement.innerHTML = "";
      const parentInput = parent.querySelector("input");
      const inputPadAndMarg = getComputedStyle(parentInput);
      const inputSizes =
        parseInt(inputPadAndMarg.marginTop) +
        parseInt(inputPadAndMarg.marginBottom) +
        parseInt(inputPadAndMarg.paddingTop) +
        parseInt(inputPadAndMarg.paddingBottom);
      const desiredHeight =
        parent.querySelector("label").scrollHeight +
        parentInput.scrollHeight +
        inputSizes;
      suggestionElement.style.top = `${desiredHeight}px`;
      parent.style.position = "relative";
      const newUlELement = document.createElement("ul");
      suggestionElement.appendChild(newUlELement);
      if (elements) {
        elements.forEach((element) => {
          const newElementToShow = document.createElement("li");
          newElementToShow.innerHTML = element;
          newElementToShow.addEventListener("click", (e) => {
            input.value = e.target.innerText;
          });
          newUlELement.appendChild(newElementToShow);
        });
      }
    };
  };
}

const form = document.getElementById("mainForm");
const validator = new FormValidator(form);
