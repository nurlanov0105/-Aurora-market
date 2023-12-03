/*jslint devel: true, browser: true, white: true */
/*global $, jQuery, alert*/
jQuery(function ($) {
   "use strict";

   $(document).ready(function () {
      const headerMain = $("#header-main");
      headerMain.owlCarousel({
         items: 1,
         dots: true,
         nav: false,
         loop: true,
         autoplay: true,
         autoplayTimeout: 4000,
         autoplayHoverPause: true,
      });
      const newsSlider = $("#news-cards");
      newsSlider.owlCarousel({
         items: 1,
         dots: true,
         nav: false,
      });

      const body = document.body;
      const overlay = document.querySelector(".overlay");

      // nav list

      const logIn = document.querySelector(".user-login");
      const authorizCross = document.querySelector(".authorization__cross");
      const authorizationWrapper = document.querySelector(".authorization-wrapper");

      logIn.addEventListener("click", function () {
         overlay.classList.add("active");
         authorizationWrapper.classList.add("active");
      });

      authorizCross.addEventListener("click", function () {
         overlay.classList.remove("active");
         authorizationWrapper.classList.remove("active");
      });

      overlay.addEventListener("click", function () {
         overlay.classList.remove("active");
         authorizationWrapper.classList.remove("active");
      });

      // Input mask
      const authorizationTel = document.querySelector("#authorizationTel");

      intlTelInput(authorizationTel, {
         initialCountry: "auto",
         geoIpLookup: function (success, failure) {
            $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
               let countryCode = resp && resp.country ? resp.country : "";
               success(countryCode);
            });
         },
         // utilsScript: "../libs/intelinput/js/utils.js",
      });

      //FORM Tel VALIDATE
      $(".authorization__form-tel").validate({
         rules: {
            tel: {
               required: true,
            },
         },
         messages: {
            tel: {
               required: "",
            },
         },
         submitHandler: function (form) {
            successShowMessage();
         },
      });

      function successShowMessage() {}
      //FORM Email VALIDATE
      $(".authorization__form-email").validate({
         rules: {
            email: {
               required: true,
               email: true,
            },
            password: {
               required: true,
            },
         },
         messages: {
            email: {
               required: "",
            },
            password: {
               required: "",
            },
         },
      });

      const formAuthorTel = document.querySelector(".authorization__form-tel");
      const formAuthorSuccesTel = document.querySelector(".authorization__succes-tel");
      const formAuthorSuccesEmail = document.querySelector(".authorization__succes-email");
      const authorOptions = document.querySelector(".authorization__options");

      formAuthorTel.addEventListener("submit", function (e) {
         e.preventDefault();
         const authorInputTel = document.querySelector("#authorizationTel");

         const authorAllInputs = formAuthorTel.querySelectorAll(".authorization__input");
         authorAllInputs.forEach(function (input) {
            input.classList.remove("active");
         });
         if (!authorInputTel.value) {
            authorAllInputs.forEach(function (input) {
               input.classList.add("active");
               input.addEventListener("input", function () {
                  input.classList.remove("active");
               });
            });
         } else {
            authorAllInputs.forEach(function (input) {
               input.classList.remove("active");
            });
            authorOptions.classList.remove("active");
            formAuthorTel.classList.remove("active");
            formAuthorSuccesTel.classList.add("active");
            // formAuthorTel.submit();
         }
      });

      const formAuthorEmail = document.querySelector(".authorization__form-email");
      formAuthorEmail.addEventListener("submit", function (e) {
         e.preventDefault();

         const authorInputEmail = document.querySelector(".authorization__input-email");
         const authorInputPassword = document.querySelector(".authorization__input-password");
         const authorizationError = formAuthorEmail.querySelector(".authorization__error");
         const authorAllInputs = formAuthorEmail.querySelectorAll(".authorization__input");

         authorAllInputs.forEach(function (input) {
            input.classList.remove("active");
         });
         authorizationError.classList.remove("active");

         if (!(authorInputEmail.value && authorInputPassword.value)) {
            authorizationError.classList.add("active");
            authorAllInputs.forEach(function (input) {
               input.classList.add("active");
               input.addEventListener("input", function () {
                  input.classList.remove("active");
               });
            });
         } else {
            formAuthorEmail.classList.remove("active");
            authorizationError.classList.remove("active");
            authorOptions.classList.remove("active");
            formAuthorSuccesEmail.classList.add("active");
            // formAuthorEmail.submit();
         }
      });

      formAuthorSuccesTel.addEventListener("submit", function (e) {
         e.preventDefault();
      });

      formAuthorSuccesEmail.addEventListener("submit", function (e) {
         e.preventDefault();
      });

      // Login Form
      formAuthorSuccesTel.addEventListener("submit", function (e) {
         e.preventDefault();
      });
      const loginBtn = document.querySelector(".login-btn");
      loginBtn.addEventListener("click", function (e) {
         e.preventDefault();
         e.stopPropagation();

         const authorizationInputProve = document.querySelector(".authorization__input-prove");
         const authorization = document.querySelector("[data-authorization]");
         const userProfile = document.querySelector(".user-profile");
         authorizationInputProve.classList.remove("active");

         if (authorizationInputProve.value.length == 7) {
            overlay.classList.remove("active");
            authorization.classList.add("none");
            logIn.classList.remove("active");
            userProfile.classList.add("active");
         } else {
            authorizationInputProve.classList.add("active");
         }
      });

      // Options form
      const logTel = document.querySelector("#login-tel");
      const logEmail = document.querySelector("#login-email");
      const authorFormTel = document.querySelector(".authorization__form-tel");
      const authorFormEmail = document.querySelector(".authorization__form-email");

      logTel.addEventListener("click", function () {
         logEmail.classList.remove("active");
         logTel.classList.add("active");
         authorFormEmail.classList.remove("active");
         authorFormTel.classList.add("active");
      });
      logEmail.addEventListener("click", function () {
         logTel.classList.remove("active");
         logEmail.classList.add("active");
         authorFormTel.classList.remove("active");
         authorFormEmail.classList.add("active");
      });

      if (window.location.toString().indexOf("index.html") > 0) {
         // mostViewNext
         const mostViewSlider = $("#most-view-slider");
         mostViewSlider.owlCarousel({
            dots: false,
            nav: false,

            responsive: {
               0: {
                  items: 4,
                  margin: 10,
               },
               1199: {
                  items: 5,
                  margin: 20,
               },
            },
         });

         const mostViewNext = $("#mostViewNext");
         mostViewNext.click(function () {
            mostViewSlider.trigger("next.owl.carousel");
         });

         // arrivals-slider
         const arrivalsSlider = $("#arrivals-slider");
         arrivalsSlider.owlCarousel({
            dots: true,
            nav: false,

            responsive: {
               0: {
                  items: 4,
                  margin: 10,
               },
               1199: {
                  items: 5,
                  margin: 20,
               },
            },
         });
         const arrivalsNextBtn = $("#arrivalsNextBtn");

         arrivalsNextBtn.click(function () {
            arrivalsSlider.trigger("next.owl.carousel");
         });
      }

      if (window.location.toString().indexOf("registration.html") > 0) {
         // registration tel mask
         const regisTel = document.querySelector("#regisTel");

         intlTelInput(regisTel, {
            initialCountry: "auto",
            geoIpLookup: function (success, failure) {
               $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
                  let countryCode = resp && resp.country ? resp.country : "";
                  success(countryCode);
               });
            },
            // utilsScript: "../libs/intelinput/js/utils.js",
         });

         //FORM Registration Blank VALIDATE
         $("#registrationFormBlank").validate({
            rules: {
               name: {
                  required: true,
               },
               email: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               password: {
                  required: true,
               },
               passwordProve: {
                  required: true,
               },
               isagree: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               password: {
                  required: "*",
               },
               passwordProve: {
                  required: "*",
               },
               isagree: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               sendingFormSMSSubmit();
            },
         });

         function sendingFormSMSSubmit() {
            const registrationFormBlank = document.querySelector("#registrationFormBlank");
            const registrationFormSucces = document.querySelector("#registrationFormSucces");

            registrationFormBlank.classList.remove("active");
            registrationFormSucces.classList.add("active");
            const finalRegisterBtn = document.querySelector("[data-final-register]");
            const finalResentrBtn = document.querySelector("[data-resent-btn]");
            const smsInput = document.querySelector("#smsInput");

            registrationFormSucces.addEventListener("submit", function (e) {
               e.preventDefault();
            });

            finalRegisterBtn.addEventListener("click", function (e) {
               e.preventDefault();
               e.stopPropagation();
               const inputLabelError = document.querySelector(".input-label__error");

               inputLabelError.classList.remove("active");

               if (!smsInput.value) {
                  inputLabelError.classList.add("active");

                  smsInput.addEventListener("input", function () {
                     inputLabelError.classList.remove("active");
                  });
               } else {
                  const succesPopup = document.querySelector(".succes-popup");
                  const btnSuccesPopupClose = document.querySelector("[data-close-btn]");
                  overlay.classList.add("active");
                  succesPopup.classList.add("active");

                  overlay.addEventListener("click", function () {
                     overlay.classList.remove("active");
                     succesPopup.classList.remove("active");
                  });
                  btnSuccesPopupClose.addEventListener("click", function () {
                     overlay.classList.remove("active");
                     succesPopup.classList.remove("active");
                  });
               }
            });

            finalResentrBtn.addEventListener("click", function (e) {
               e.preventDefault();
               e.stopPropagation();
            });
         }
      }

      if (window.location.toString().indexOf("password.html") > 0) {
         //FORM Tel VALIDATE
         $("#passwordChangeForm").validate({
            rules: {
               oldPassword: {
                  required: true,
               },
               newPassword: {
                  required: true,
               },
               provePassword: {
                  required: true,
               },
            },
            messages: {
               oldPassword: {
                  required: "*",
               },
               newPassword: {
                  required: "*",
               },
               provePassword: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               form.submit();
            },
         });
      }

      if (window.location.toString().indexOf("restore.html") > 0) {
         const restoreTel = document.querySelector("#restoreTel");

         const restoreOptionTel = document.querySelector(".restore__option-tel");
         const restoreOptionEmail = document.querySelector(".restore__option-email");
         const restoreFormTel = document.querySelector("#restoreFormTel");
         const restoreFormEmail = document.querySelector("#restoreFormEmail");

         //FORM Tel VALIDATE
         $("#restoreFormTel").validate({
            rules: {
               tel: {
                  required: true,
               },
            },
            messages: {
               tel: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               restorePasswordSubmit();
            },
         });
         //FORM Tel VALIDATE
         $("#restoreFormEmail").validate({
            rules: {
               email: {
                  required: true,
               },
            },
            messages: {
               email: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               successEmailSubmit();
            },
         });

         function successEmailSubmit() {
            const succesPopup = document.querySelector(".succes-popup");
            const btnSuccesPopupClose = document.querySelector("[data-close-btn]");
            overlay.classList.add("active");
            succesPopup.classList.add("active");

            overlay.addEventListener("click", function () {
               overlay.classList.remove("active");
               succesPopup.classList.remove("active");
            });
            btnSuccesPopupClose.addEventListener("click", function () {
               overlay.classList.remove("active");
               succesPopup.classList.remove("active");
            });
         }
         function restorePasswordSubmit() {
            const restoreOptions = document.querySelector(".restore__options");
            const restoreDescr = document.querySelector(".restore__descr");
            const restoreForm = document.querySelectorAll(".restore__form");
            const restoreFormPassword = document.querySelector(".restore__form-password");

            restoreOptions.classList.add("none");
            restoreDescr.classList.add("none");
            restoreForm.forEach(function (restoreForm) {
               restoreForm.classList.remove("active");
            });
            restoreFormPassword.classList.add("active");
         }

         //FORM Tel VALIDATE
         $("#restoreFormPassword").validate({
            rules: {
               newPassword: {
                  required: true,
               },
               provePassword: {
                  required: true,
               },
            },
            messages: {
               newPassword: {
                  required: "*",
               },
               provePassword: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               successRestoreSubmit();
            },
         });

         function successRestoreSubmit() {
            const restoreContent = document.querySelector(".restore__content");
            const restoreSuccess = document.querySelector(".restore__success");
            restoreContent.classList.add("none");
            restoreSuccess.classList.add("active");
         }

         // Restore Options
         restoreOptionTel.addEventListener("click", function () {
            restoreOptionEmail.classList.remove("active");
            restoreFormEmail.classList.remove("active");
            restoreOptionTel.classList.add("active");
            restoreFormTel.classList.add("active");
         });
         restoreOptionEmail.addEventListener("click", function () {
            restoreOptionTel.classList.remove("active");
            restoreFormTel.classList.remove("active");
            restoreOptionEmail.classList.add("active");
            restoreFormEmail.classList.add("active");
         });

         intlTelInput(restoreTel, {
            initialCountry: "auto",
            geoIpLookup: function (success, failure) {
               $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
                  let countryCode = resp && resp.country ? resp.country : "";
                  success(countryCode);
               });
            },
            // utilsScript: "../libs/intelinput/js/utils.js",
         });
      }

      if (window.location.toString().indexOf("authorization.html") > 0) {
         // Input mask
         const authorizationTel = document.querySelector("#authorizationTel");

         intlTelInput(authorizationTel, {
            initialCountry: "auto",
            geoIpLookup: function (success, failure) {
               $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
                  let countryCode = resp && resp.country ? resp.country : "";
                  success(countryCode);
               });
            },
            // utilsScript: "../libs/intelinput/js/utils.js",
         });

         //FORM Tel VALIDATE
         $(".authorization__form-tel").validate({
            rules: {
               tel: {
                  required: true,
               },
            },
            messages: {
               tel: {
                  required: "",
               },
            },
            submitHandler: function (form) {
               successShowMessage();
            },
         });

         function successShowMessage() {}
         //FORM Email VALIDATE
         $(".authorization__form-email").validate({
            rules: {
               email: {
                  required: true,
                  email: true,
               },
               password: {
                  required: true,
               },
            },
            messages: {
               email: {
                  required: "",
               },
               password: {
                  required: "",
               },
            },
         });

         const formAuthorTel = document.querySelector(".authorization__form-tel");
         const numOfMessage = document.querySelector(".authorization__succes-tel");
         const formAuthorSuccesEmail = document.querySelector(".authorization__succes-email");
         const authorOptions = document.querySelector(".authorization__options");

         formAuthorTel.addEventListener("submit", function (e) {
            e.preventDefault();
            const authorInputTel = document.querySelector("#authorizationTel");

            const authorAllInputs = formAuthorTel.querySelectorAll(".authorization__input");
            authorAllInputs.forEach(function (input) {
               input.classList.remove("active");
            });
            if (!authorInputTel.value) {
               authorAllInputs.forEach(function (input) {
                  input.classList.add("active");
                  input.addEventListener("input", function () {
                     input.classList.remove("active");
                  });
               });
            } else {
               authorAllInputs.forEach(function (input) {
                  input.classList.remove("active");
               });
               authorOptions.classList.remove("active");
               formAuthorTel.classList.remove("active");
               formAuthorSuccesTel.classList.add("active");
               // formAuthorTel.submit();
            }
         });

         const formAuthorEmail = document.querySelector(".authorization__form-email");
         formAuthorEmail.addEventListener("submit", function (e) {
            e.preventDefault();

            const authorInputEmail = document.querySelector(".authorization__input-email");
            const authorInputPassword = document.querySelector(".authorization__input-password");
            const authorizationError = formAuthorEmail.querySelector(".authorization__error");
            const authorAllInputs = formAuthorEmail.querySelectorAll(".authorization__input");

            authorAllInputs.forEach(function (input) {
               input.classList.remove("active");
            });
            authorizationError.classList.remove("active");

            if (!(authorInputEmail.value && authorInputPassword.value)) {
               authorizationError.classList.add("active");
               authorAllInputs.forEach(function (input) {
                  input.classList.add("active");
                  input.addEventListener("input", function () {
                     input.classList.remove("active");
                  });
               });
            } else {
               formAuthorEmail.classList.remove("active");
               authorizationError.classList.remove("active");
               authorOptions.classList.remove("active");
               formAuthorSuccesEmail.classList.add("active");
               // formAuthorEmail.submit();
            }
         });

         // Login Form
         formAuthorSuccesTel.addEventListener("submit", function (e) {
            e.preventDefault();
         });
         const loginBtn = document.querySelector(".login-btn");
         loginBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            const authorizationInputProve = document.querySelector(".authorization__input-prove");
            // const authorization = document.querySelector("[data-authorization]");
            // const userProfile = document.querySelector(".user-profile");
            const itemProfileLogin = document.querySelector(".mob-nav__profile-login");
            const itemProfileProfile = document.querySelector(".mob-nav__profile-profile");

            authorizationInputProve.classList.remove("active");

            if (authorizationInputProve.value.length == 7) {
               itemProfileLogin.classList.remove("active");
               itemProfileProfile.classList.add("active");
               location.href = "../index.html";
            } else {
               authorizationInputProve.classList.add("active");
            }
         });

         formAuthorSuccesEmail.addEventListener("submit", function (e) {
            e.preventDefault();
         });

         // Options form
         const logTel = document.querySelector("#login-tel");
         const logEmail = document.querySelector("#login-email");
         const authorFormTel = document.querySelector(".authorization__form-tel");
         const authorFormEmail = document.querySelector(".authorization__form-email");

         logTel.addEventListener("click", function () {
            logEmail.classList.remove("active");
            logTel.classList.add("active");
            authorFormEmail.classList.remove("active");
            authorFormTel.classList.add("active");
         });
         logEmail.addEventListener("click", function () {
            logTel.classList.remove("active");
            logEmail.classList.add("active");
            authorFormTel.classList.remove("active");
            authorFormEmail.classList.add("active");
         });
      }

      const dataNav = document.querySelectorAll("[data-nav]");
      const subSecListDatas = document.querySelectorAll("[data-nav-content]");
      dataNav.forEach(function (item) {
         item.addEventListener("mouseover", function () {
            item.classList.add("active");
            const subSecListId = document.querySelector("#" + this.dataset.nav);
            subSecListId.classList.add("active");

            subSecListId.addEventListener("mouseover", function () {
               item.classList.add("active");
               subSecListId.classList.add("active");
            });
            subSecListId.addEventListener("mouseout", function () {
               subSecListId.classList.remove("active");
            });
         });

         item.addEventListener("mouseout", function () {
            const subSecListId = document.querySelector("#" + this.dataset.nav);
            item.classList.remove("active");
            subSecListId.classList.remove("active");
         });
      });

      // Кнопка купить
      const btnBuy = document.querySelectorAll(".btn-buy");
      btnBuy.forEach(function (item) {
         item.addEventListener("click", function () {
            item.classList.toggle("active");
            const productAdded = document.querySelector(".product-added");
            const productContBtn = document.querySelector("[data-cont-btn]");
            if (item.classList.contains("active")) {
               overlay.classList.add("active");
               productAdded.classList.add("active");

               productContBtn.addEventListener("click", function () {
                  overlay.classList.remove("active");
                  productAdded.classList.remove("active");
               });

               overlay.addEventListener("click", function () {
                  overlay.classList.remove("active");
                  productAdded.classList.remove("active");
               });
            } else {
               overlay.classList.remove("active");
               productAdded.classList.remove("active");
            }
         });
      });

      // Кнопки рядом с кнопкой купить
      const btnIcon = document.querySelectorAll(".btn__icon");
      btnIcon.forEach(function (item) {
         item.addEventListener("click", function () {
            item.classList.toggle("active");
         });
      });

      // Форма поиска
      const mobSearch = document.querySelector(".header-mob__round");
      const mobSearchInput = document.querySelector(".header-mob__search");
      const mobForm = document.querySelector(".header-mob__form");
      const headerLogo = document.querySelector(".header__logo");

      mobSearch.addEventListener("click", function (e) {
         if (mobForm.classList.contains("active")) {
            e.preventDefault();

            // Если в input пусто или пробелы
            if (mobSearchInput.value.trim() === "") {
               // Закрываем форму, сбрасываем ввод
               mobForm.classList.toggle("active");
               mobSearchInput.value = "";
               headerLogo.classList.remove("active");
            } else {
               // Иначе, отправляем форму
               mobForm.submit();
               headerLogo.classList.add("active");
            }
         } else {
            e.preventDefault();
            mobForm.classList.toggle("active");

            if (!headerLogo.classList.contains("active")) {
               headerLogo.classList.add("active");
            } else {
               headerLogo.classList.remove("active");
            }
         }
      });

      // Аккардеон для футера
      const footerItemRow = document.querySelectorAll(".footer__mob-item-row");
      footerItemRow.forEach(function (item) {
         item.addEventListener("click", function () {
            item.parentNode.classList.toggle("active");
         });
      });

      const burgerOpen = document.querySelector("#burgerOpen");
      const burgerClose = document.querySelector("#burgerClose");
      const mobNav = document.querySelector(".mob-nav");
      const mobNavSubItem = document.querySelectorAll(".mob-nav__sub-item a");
      const mobNavSecItem = document.querySelectorAll(".mob-nav__sec-item a");
      const mobNavProfItem = document.querySelectorAll(".mob-nav__profile-item a");

      // Main

      burgerOpen.addEventListener("click", function () {
         mobNav.classList.add("active");
         body.classList.add("active");
      });
      burgerClose.addEventListener("click", function () {
         mobNav.classList.remove("active");
         body.classList.remove("active");
      });

      const mobItem = document.querySelectorAll(".mob-nav__item-row");
      mobItem.forEach(function (item) {
         item.addEventListener("click", function () {
            item.parentNode.classList.toggle("active");
         });
      });

      mobNavSubItem.forEach(function (item) {
         item.addEventListener("click", function () {
            mobNav.classList.remove("active");
            body.classList.remove("active");
         });
      });
      mobNavSecItem.forEach(function (item) {
         item.addEventListener("click", function () {
            mobNav.classList.remove("active");
            body.classList.remove("active");
         });
      });
      mobNavProfItem.forEach(function (item) {
         item.addEventListener("click", function () {
            mobNav.classList.remove("active");
            body.classList.remove("active");
         });
      });

      // Проверка страницы сайта catalog
      if (window.location.toString().indexOf("catalog.html") > 0) {
         // filter

         const filterSLider = document.querySelectorAll(".filter__slider-row");

         const filterItemHead = document.querySelectorAll(".filter__item-head");

         filterItemHead.forEach(function (item) {
            item.addEventListener("click", function () {
               item.parentNode.classList.toggle("active");
            });
         });

         filterSLider.forEach(function (filterSlider) {
            const rangeInput = filterSlider.querySelectorAll(".filter__range-input input"),
               priceInput = filterSlider.querySelectorAll(".filter__field-row input"),
               progress = filterSlider.querySelector(".filter__progress");

            let priceGap = 9999;

            rangeInput.forEach((input) => {
               input.addEventListener("input", (e) => {
                  let minVal = parseInt(rangeInput[0].value),
                     maxVal = parseInt(rangeInput[1].value);

                  if (maxVal - minVal < priceGap) {
                     if (e.target.className === "filter__range-min") {
                        rangeInput[0].value = maxVal - priceGap;
                     } else {
                        rangeInput[1].value = minVal + priceGap;
                     }
                  } else {
                     priceInput[0].value = minVal;
                     priceInput[1].value = maxVal;
                     progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
                     progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
                  }
               });
            });

            const minInput = filterSlider.querySelector(".filter__field-min");
            const maxInput = filterSlider.querySelector(".filter__field-max");
            const minRange = filterSlider.querySelector(".filter__range-min");
            const maxRange = filterSlider.querySelector(".filter__range-max");
            const progressLine = filterSlider.querySelector(".filter__progress");
            minInput.addEventListener("input", function () {
               minRange.value = minInput.value;
               progressLine.style.left = (+minRange.value / 999999) * 100 + "%";
            });
            maxInput.addEventListener("input", function () {
               maxRange.value = maxInput.value;
               progressLine.style.right = (+maxInput.value / 999999) * 100 + "%";
            });
         });

         // Filter Catalog content
         const btnFilterSmall = document.querySelector(".filter-var__sizes-grid");
         const btnFilterWide = document.querySelector(".filter-var__sizes-wide");
         const wideContent = document.querySelector(".catalog__content-wide");
         const gridContent = document.querySelector(".catalog__content-grid");

         btnFilterSmall.addEventListener("click", function () {
            btnFilterWide.classList.remove("active");
            btnFilterSmall.classList.add("active");

            wideContent.classList.remove("active");
            gridContent.classList.add("active");
         });

         btnFilterWide.addEventListener("click", function () {
            btnFilterSmall.classList.remove("active");
            btnFilterWide.classList.add("active");

            gridContent.classList.remove("active");
            wideContent.classList.add("active");
         });

         // Pagination at the bottom of catalog
         const paginationItem = document.querySelectorAll(".page-pagination__item");
         paginationItem.forEach(function (item) {
            item.addEventListener("click", function () {
               paginationItem.forEach(function (item2) {
                  item2.classList.remove("active");
               });
               item.classList.add("active");
            });
         });

         // Dropdown

         const dropdown = document.querySelectorAll(".dropdown");
         dropdown.forEach(function (dropdown) {
            const dropdownBtn = dropdown.querySelector(".dropdown__btn");
            const dropdownList = dropdown.querySelector(".dropdown__list");
            const dropListItem = dropdown.querySelectorAll(".dropdown__list-item");
            dropdownBtn.addEventListener("click", function () {
               dropdownBtn.classList.add("active");
               dropdownList.classList.toggle("active");
               dropListItem.forEach(function (dropItem) {
                  dropItem.addEventListener("click", function (e) {
                     e.stopPropagation();
                     dropdownBtn.innerText = dropItem.innerText;
                     dropdownList.classList.remove("active");
                  });
               });

               const notFoundCatalog = document.querySelector("[data-catalog-notfound]");
               const dropDownFilter = document.querySelector(".filter-var__sizes");

               if (notFoundCatalog.classList.contains("active")) {
                  dropDownFilter.classList.add("active");
               } else {
                  dropDownFilter.classList.remove("active");
               }
            });

            document.addEventListener("click", function (e) {
               if (e.target !== dropdownBtn) {
                  dropdownBtn.classList.remove("active");
                  dropdownList.classList.remove("active");
               }
            });

            document.addEventListener("keydown", function (e) {
               if (e.key === "Tab" || e.key === "Escape") {
                  dropdownBtn.classList.remove("active");
                  dropdownList.classList.remove("active");
               }
            });
         });

         const filterReset = document.querySelectorAll("[data-filter-reset]");
         filterReset.forEach(function (filterReset) {
            filterReset.addEventListener("click", function (e) {
               e.stopPropagation();
            });
         });

         const filter = document.querySelectorAll(".filter");

         filter.forEach(function (filter) {
            const filterStarsThree = filter.querySelector("[data-stars-three]");
            const filterStarsTwo = filter.querySelector("[data-stars-two]");
            const filterItems = filter.querySelectorAll(".filter__item");
            const filterItemPrice = filter.querySelector(".filter__item-price");
            const filterItemRating = filter.querySelector(".filter__item-rating");
            const catalogFound = document.querySelector("[data-catalog-found]");
            const catalogNotFound = document.querySelector("[data-catalog-notfound]");
            const catalogContentWide = document.querySelector(".catalog__content-wide");
            const catalogContentGrid = document.querySelector(".catalog__content-grid");
            const catalogMob = document.querySelector(".catalog__mob");

            filterStarsThree.addEventListener("click", function () {
               filterItems.forEach(function (filterItem) {
                  filterItem.style.cssText = `display: none`;
               });
               catalogNotFound.classList.remove("active");
               catalogContentWide.classList.add("active");
               catalogContentGrid.classList.remove("active");

               filterItemPrice.style.cssText = `display: flex`;
               filterItemRating.style.cssText = `display: flex`;
               catalogFound.classList.add("active");

               if ($(window).width() < 899) {
                  const catalogFilterType = document.querySelector(".catalog__filter-type");
                  const catalogMob = document.querySelector(".catalog__mob");
                  catalogMob.classList.remove("none");
                  catalogFilterType.classList.add("none");
               }
            });
            filterStarsTwo.addEventListener("click", function () {
               filterItems.forEach(function (filterItem) {
                  filterItem.style.cssText = `display: none`;
               });
               catalogFound.classList.remove("active");
               catalogNotFound.classList.add("active");
               filterItemPrice.style.cssText = `display: flex`;
               filterItemRating.style.cssText = `display: flex`;
               catalogContentWide.classList.remove("active");
               catalogContentGrid.classList.remove("active");

               if ($(window).width() < 899) {
                  const catalogMob = document.querySelector(".catalog__mob");
                  const catalogFilterType = document.querySelector(".catalog__filter-type");
                  catalogMob.classList.add("none");
                  catalogFilterType.classList.add("none");
               }
            });

            const filterResetPrice = filter.querySelector("[data-filter-reset-price]");
            filterResetPrice.addEventListener("click", function () {
               const filterProgress = filter.querySelector(".filter__progress");
               const filterRangeMin = filter.querySelector(".filter__range-min");
               const filterRangeMax = filter.querySelector(".filter__range-max");
               const filterFieldMin = filter.querySelector(".filter__field-min");
               const filterFieldMax = filter.querySelector(".filter__field-max");
               filterProgress.style.cssText = `
                  left: 25%;
                  right: 35%;`;

               filterRangeMin.value = "253504";
               filterRangeMax.value = "650000";
               filterFieldMin.value = "";
               filterFieldMax.value = "";
            });

            const filterResetRating = filter.querySelector("[data-filter-reset-rating]");

            filterResetRating.addEventListener("click", function () {
               const filterRealCheckBox = filter.querySelectorAll(".filter__real-checkbox");
               filterRealCheckBox.forEach(function (item) {
                  item.checked = false;
               });
            });
         });

         // Mobile Filter

         const mobFilter = document.querySelector(".mob-filter");
         const filterBtn = document.querySelector(".filter-btn");
         const prevArrow = document.querySelector(".prev-arrow");

         filterBtn.addEventListener("click", function () {
            overlay.classList.add("active");
            mobFilter.classList.add("active");
            body.classList.add("active");
         });

         prevArrow.addEventListener("click", function () {
            overlay.classList.remove("active");
            mobFilter.classList.remove("active");
            body.classList.remove("active");
         });
      }

      // Проверка страницы - Карта Товара
      if (window.location.toString().indexOf("product.html") > 0) {
         let swiper = new Swiper(".product-card__slider-block", {
            slidesPerView: 1,
         });

         const maxItems = 4;
         const sliderNavItems = document.querySelectorAll(".product-card__nav-item");
         const sliderNav = document.querySelector(".product-card__nav");

         sliderNavItems.forEach((el, index) => {
            el.setAttribute("data-index", index);

            el.addEventListener("click", (e) => {
               const index = parseInt(e.currentTarget.dataset.index);
               swiper.slideTo(index);
            });
         });

         const showMore = () => {
            let childrenLength = sliderNav.children.length;

            if (childrenLength > maxItems) {
               document
                  .querySelectorAll(`.product-card__nav-item:nth-child(n+${maxItems + 1})`)
                  .forEach((el) => {
                     el.style.display = "none";
                  });
               sliderNav.insertAdjacentHTML(
                  "beforeend",
                  `<button class="slider-btn">Еще ${childrenLength - maxItems}</button>`
               );
            }
         };

         showMore();

         jQuery(function ($) {
            const docSlider = $("#documentationSlider");
            docSlider.owlCarousel({
               items: 1,
               dots: false,
               nav: false,
               loop: true,

               responsive: {
                  0: {
                     items: 2,
                     margin: 30,
                  },
                  600: {
                     items: 2.5,
                     margin: 0,
                  },
                  900: {
                     items: 3,
                  },
               },
            });

            const accessoriesSlider = $("#accessoriesSlider");
            accessoriesSlider.owlCarousel({
               dots: false,
               nav: false,
               loop: true,

               responsive: {
                  0: {
                     items: 2,
                     margin: 20,
                  },
                  600: {
                     items: 3,
                     margin: 0,
                  },
                  900: {
                     items: 4,
                  },
               },
            });

            const reviewsSlider = $("#reviewsSlider");
            reviewsSlider.owlCarousel({
               items: 1,
               dots: false,
               nav: false,
               loop: true,
               center: true,
               margin: 30,
            });
         });

         // Card Cashback/Gift variants

         const prdocutPromotion = document.querySelectorAll(".product-card__promotion");
         prdocutPromotion.forEach(function (prdocutPromotion) {
            const btnPromotion = prdocutPromotion.querySelectorAll("[data-promotion]");
            const promItem = prdocutPromotion.querySelectorAll("[data-prom-item]");
            const productAction = document.querySelector(".product__action");
            const productContent = document.querySelector(".product__content");

            btnPromotion.forEach(function (item) {
               item.addEventListener("click", function () {
                  btnPromotion.forEach((el) => {
                     el.classList.remove("active");
                  });

                  item.classList.add("active");
                  promItem.forEach(function (item) {
                     item.classList.remove("active");
                  });
                  const promotionItem = prdocutPromotion.querySelector(
                     `[data-${this.dataset.promotion}]`
                  );
                  // console.log(promotionItem.dataset);
                  promotionItem.classList.add("active");

                  if (promotionItem.dataset.cardGift === "card-gift") {
                     productAction.classList.add("active");
                     productContent.style.cssText = `margin-right: 60px;`;
                  } else {
                     productAction.classList.remove("active");
                     productContent.style.cssText = `margin-right: 42px;`;
                  }
               });
            });
         });

         // Button Choose
         const btnChoose = document.querySelectorAll(".btn-choose");
         btnChoose.forEach(function (item) {
            item.addEventListener("click", function () {
               item.classList.toggle("active");
               item.parentNode.classList.toggle("active");
            });
         });

         // Review Sort
         const reviewItem = document.querySelectorAll(".product__reviews-item");
         reviewItem.forEach((el) => {
            el.addEventListener("click", () => {
               reviewItem.forEach((el) => {
                  el.classList.remove("active");
               });
               el.classList.add("active");
            });
         });

         // Comparison

         const comparison = document.querySelectorAll(".comparison");

         comparison.forEach(function (item) {
            item.addEventListener("click", function () {
               item.classList.toggle("active");
            });
         });
         // Favorite

         const favorite = document.querySelectorAll(".favorite");

         favorite.forEach(function (item) {
            item.addEventListener("click", function () {
               item.classList.toggle("active");
            });
         });

         // ORDER

         const btnClick = document.querySelectorAll(".btn-click__modal");
         const orderWrapper = document.querySelector(".order-wrapper");
         const formBtnCont = document.querySelectorAll(".form-succes__btn");

         const modalCross = document.querySelectorAll(".modal-cross");
         modalCross.forEach((el) => {
            el.addEventListener("click", () => {
               const modalWrapper = el.parentNode.parentNode;
               modalWrapper.classList.remove("active");
               overlay.classList.remove("active");
            });
         });

         btnClick.forEach((el) => {
            el.addEventListener("click", () => {
               orderWrapper.classList.add("active");
               overlay.classList.add("active");
            });
         });

         overlay.addEventListener("click", () => {
            overlay.classList.remove("active");
            orderWrapper.classList.remove("active");
         });

         formBtnCont.forEach((el) => {
            el.addEventListener("click", () => {
               const modalSuccesWrapper = el.parentNode.parentNode.parentNode;
               modalSuccesWrapper.classList.remove("active");
               overlay.classList.remove("active");
            });
         });

         // const ordertel = document.querySelector("#order-tel");
         const actionTel = document.querySelector("#action-tel");

         // intlTelInput(ordertel, {
         //    initialCountry: "auto",
         //    geoIpLookup: function (success, failure) {
         //       $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
         //          let countryCode = resp && resp.country ? resp.country : "";
         //          success(countryCode);
         //       });
         //    },
         //    // utilsScript: "../libs/intelinput/js/utils.js",
         // });
         intlTelInput(actionTel, {
            initialCountry: "auto",
            geoIpLookup: function (success, failure) {
               $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
                  let countryCode = resp && resp.country ? resp.country : "";
                  success(countryCode);
               });
            },
            // utilsScript: "../libs/intelinput/js/utils.js",
         });

         //FORM VALIDATE
         $(".order").validate({
            rules: {
               tel: {
                  required: true,
               },
            },
            messages: {
               tel: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               ajaxFormSubmit();
            },
         });

         // Функция AJAX запрса на сервер

         function ajaxFormSubmit() {
            let string = $(".order").serialize(); // Соханяем данные введенные в форму в строку.

            //Формируем ajax запрос
            $.ajax({
               type: "POST", // Тип запроса - POST
               url: "php/mail.php", // Куда отправляем запрос
               data: string, // Какие даные отправляем, в данном случае отправляем переменную string

               // Функция если все прошло успешно
               success: function (html) {
                  $(".order").slideUp(1);
                  $("#answer").html(html);
               },
            });
            // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
            return false;
         }

         // Order Count
         const orderCountWrapper = document.querySelector(".order-count-wrapper");
         const countBtn = document.querySelectorAll(".shipping-info__btn");

         countBtn.forEach((el) => {
            el.addEventListener("click", () => {
               orderCountWrapper.classList.add("active");
               overlay.classList.add("active");
            });
         });

         overlay.addEventListener("click", () => {
            overlay.classList.remove("active");
            orderCountWrapper.classList.remove("active");
         });

         const countSearch = document.querySelector(".order-count__search");
         const countHint = document.querySelector(".order-count__hint");
         countSearch.addEventListener("input", () => {
            countHint.classList.add("active");
         });
         countSearch.addEventListener("blur", () => {
            countHint.classList.remove("active");
         });

         // Counter
         const counter = document.querySelectorAll(".counter");

         counter.forEach(function (counter) {
            let plusCount = counter.querySelector(".counter__plus");
            let minusCount = counter.querySelector(".counter__minus");
            plusCount.addEventListener("click", () => {
               let countQuantity = counter.querySelector(".counter__quantity");
               let quantity = +countQuantity.innerText;

               if (quantity >= 1) {
                  countQuantity.innerText = quantity + 1;
               }
            });

            minusCount.addEventListener("click", () => {
               let countQuantity = counter.querySelector(".counter__quantity");
               let quantity = +countQuantity.innerText;

               if (quantity > 1) {
                  countQuantity.innerText = quantity - 1;
               }
            });
         });

         // Legal Face
         const legalFaceBtn = document.querySelectorAll(".product__selling-legal");
         const legalFaceWrapper = document.querySelector(".legal-face-wrapper");
         const legalFaceCont = document.querySelector(".legal-face__btn");

         legalFaceBtn.forEach((el) => {
            el.addEventListener("click", () => {
               overlay.classList.add("active");
               legalFaceWrapper.classList.add("active");
            });
         });

         overlay.addEventListener("click", () => {
            overlay.classList.remove("active");
            legalFaceWrapper.classList.remove("active");
         });
         legalFaceCont.addEventListener("click", () => {
            overlay.classList.remove("active");
            legalFaceWrapper.classList.remove("active");
         });

         // scores popup

         const scoreBtn = document.querySelectorAll(".product-card__more");
         const scoreWrapper = document.querySelector(".score-info-wrapper");
         const scoreBtnCont = document.querySelector(".score-info__btn");

         scoreBtn.forEach((el) => {
            el.addEventListener("click", () => {
               scoreWrapper.classList.add("active");
               overlay.classList.add("active");
            });
         });

         scoreBtnCont.addEventListener("click", function () {
            overlay.classList.remove("active");
            scoreWrapper.classList.remove("active");
         });
         overlay.addEventListener("click", function () {
            overlay.classList.remove("active");
            scoreWrapper.classList.remove("active");
         });

         // Action Info
         const btnAction = document.querySelectorAll(".product__selling-action");
         const actionInfoWrapper = document.querySelector(".action-info-wrapper");
         btnAction.forEach((el) => {
            el.addEventListener("click", () => {
               overlay.classList.add("active");
               actionInfoWrapper.classList.add("active");
            });
         });
         overlay.addEventListener("click", function () {
            overlay.classList.remove("active");
            actionInfoWrapper.classList.remove("active");
         });

         //FORM VALIDATE
         $(".action-info").validate({
            rules: {
               name: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               email: {
                  required: true,
               },
               link: {
                  required: true,
               },
               message: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               link: {
                  required: "*",
               },
               message: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               ajaxFormSubmitAction();
            },
         });

         // Функция AJAX запрса на сервер

         function ajaxFormSubmitAction() {
            let string = $(".action-info").serialize(); // Соханяем данные введенные в форму в строку.

            //Формируем ajax запрос
            $.ajax({
               type: "POST", // Тип запроса - POST
               url: "php/mail.php", // Куда отправляем запрос
               data: string, // Какие даные отправляем, в данном случае отправляем переменную string

               // Функция если все прошло успешно
               success: function (html) {
                  $(".action-info").slideUp(1);
                  $("#answer-action").html(html);
               },
            });
            // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
            return false;
         }

         // Review Popup
         const reviewBtn = document.querySelectorAll(".product__reviews-btn");
         const reviewPopupWrapper = document.querySelector(".review-popup-wrapper");
         reviewBtn.forEach((el) => {
            el.addEventListener("click", () => {
               overlay.classList.add("active");
               reviewPopupWrapper.classList.add("active");
            });
         });

         overlay.addEventListener("click", function () {
            overlay.classList.remove("active");
            reviewPopupWrapper.classList.remove("active");
         });

         //FORM VALIDATE
         $(".review-popup").validate({
            rules: {
               name: {
                  required: true,
               },

               email: {
                  required: true,
               },
               advantages: {
                  required: true,
               },
               flaws: {
                  required: true,
               },
               comments: {
                  required: true,
               },
               file: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               advantages: {
                  required: "*",
               },
               flaws: {
                  required: "*",
               },
               comments: {
                  required: "*",
               },
               file: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               ajaxFormSubmitReview();
            },
         });

         // Функция AJAX запрса на сервер

         function ajaxFormSubmitReview() {
            let string = $(".review-popup").serialize(); // Соханяем данные введенные в форму в строку.

            //Формируем ajax запрос
            $.ajax({
               type: "POST", // Тип запроса - POST
               url: "php/mail.php", // Куда отправляем запрос
               data: string, // Какие даные отправляем, в данном случае отправляем переменную string

               // Функция если все прошло успешно
               success: function (html) {
                  $(".review-popup").slideUp(1);
                  $("#answer-review").html(html);
               },
            });
            // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
            return false;
         }

         // Review Stars
         const starsRow = document.querySelector(".review-popup__stars"),
            starItem = document.querySelectorAll(".review-popup__star");

         starsRow.addEventListener("click", (e) => {
            let target = e.target;
            if (target.classList.contains("review-popup__star")) {
               target.classList.add("active", "current-active");
            }
         });

         starsRow.addEventListener("mouseover", (e) => {
            let target = e.target;
            if (target.classList.contains("review-popup__star")) {
               removeClass(starItem, "active", "current-active");
               target.classList.add("active", "current-active");
               mouseOverActiveclass(starItem);
            }
         });

         function removeClass(arr) {
            for (let i = 0, iLen = arr.length; i < iLen; i++) {
               for (let j = 1; j < arguments.length; j++) {
                  starItem[i].classList.remove(arguments[j]);
               }
            }
         }

         function mouseOverActiveclass(arr) {
            for (let i = 0, iLen = arr.length; i < iLen; i++) {
               if (arr[i].classList.contains("active")) {
                  break;
               } else {
                  arr[i].classList.add("active");
               }
            }
         }

         // read more review
         const readMoreBtn = document.querySelectorAll("[data-read-more]");
         readMoreBtn.forEach((el) => {
            el.addEventListener("click", () => {
               const comment = el.previousElementSibling;

               if (el.innerText === "Читать полностью") {
                  el.innerText = "Скрыть";
                  comment.style.cssText = `-webkit-line-clamp: unset`;
               } else {
                  el.innerText = "Читать полностью";
                  comment.style.cssText = `-webkit-line-clamp: 5`;
               }
            });
         });

         // filter-review
         const flterReviewBtn = document.querySelector(".product__reviews-filter"),
            reviewFilter = document.querySelector(".review-filter"),
            reviewFilterItem = document.querySelectorAll(".review-filter__item"),
            revFilterBtn = document.querySelector(".review-filter__btn"),
            revFilterRating = document.querySelector(".review-filter__rating"),
            revFilterSubItem = document.querySelectorAll(".review-filter__sub-item");

         flterReviewBtn.addEventListener("click", () => {
            overlay.classList.add("active");
            reviewFilter.classList.add("active");
         });

         reviewFilterItem.forEach((el) => {
            el.addEventListener("click", () => {
               reviewFilterItem.forEach((el2) => {
                  el2.classList.remove("active");
               });
               el.classList.add("active");
            });
         });

         overlay.addEventListener("click", function () {
            overlay.classList.remove("active");
            reviewFilter.classList.remove("active");
         });

         // filter review dropdown
         revFilterBtn.addEventListener("click", () => {
            revFilterRating.classList.toggle("active");
         });

         revFilterSubItem.forEach((el) => {
            el.addEventListener("click", () => {
               revFilterBtn.innerHTML = el.innerHTML;
            });
         });
      }

      if (window.location.toString().indexOf("basket.html") > 0) {
         // Counter
         const counter = document.querySelectorAll(".counter");

         counter.forEach(function (counter) {
            let plusCount = counter.querySelector(".counter__plus");
            let minusCount = counter.querySelector(".counter__minus");
            plusCount.addEventListener("click", () => {
               let countQuantity = counter.querySelector(".counter__quantity");
               let quantity = +countQuantity.innerText;

               if (quantity >= 1) {
                  countQuantity.innerText = quantity + 1;
               }
            });

            minusCount.addEventListener("click", () => {
               let countQuantity = counter.querySelector(".counter__quantity");
               let quantity = +countQuantity.innerText;

               if (quantity > 1) {
                  countQuantity.innerText = quantity - 1;
               }
            });
         });

         const accessoriesSlider = $("#accessoriesSlider");
         accessoriesSlider.owlCarousel({
            dots: false,
            nav: false,
            loop: true,

            responsive: {
               0: {
                  items: 2,
                  margin: 20,
               },
               600: {
                  items: 3,
                  margin: 0,
               },
               900: {
                  items: 4,
               },
            },
         });
         const accessoriesSlider2 = $("#accessoriesSlider-2");
         accessoriesSlider2.owlCarousel({
            dots: false,
            nav: false,
            loop: true,

            responsive: {
               0: {
                  items: 2,
                  margin: 20,
               },
               600: {
                  items: 3,
                  margin: 0,
               },
               900: {
                  items: 4,
               },
            },
         });
      }

      if (window.location.toString().indexOf("ordering.html") > 0) {
         const orderingTel = document.querySelector("#oredering-tel");

         intlTelInput(orderingTel, {
            initialCountry: "auto",
            geoIpLookup: function (success, failure) {
               $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
                  let countryCode = resp && resp.country ? resp.country : "";
                  success(countryCode);
               });
            },
            // utilsScript: "../libs/intelinput/js/utils.js",
         });

         const orderingPayBtn = document.querySelectorAll(".ordering-pay__label");
         orderingPayBtn.forEach(function (item) {
            item.addEventListener("click", function () {
               orderingPayBtn.forEach(function (item2) {
                  item2.classList.remove("active");
               });
               item.classList.add("active");
            });
         });
         const orderingShipBtn = document.querySelectorAll(".ordering-shipping__label");
         orderingShipBtn.forEach(function (item) {
            item.addEventListener("click", function () {
               orderingShipBtn.forEach(function (item2) {
                  item2.classList.remove("active");
               });
               item.classList.add("active");
            });
         });

         //FORM VALIDATE
         $("#ordering-form").validate({
            rules: {
               name: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               email: {
                  required: true,
               },
               street: {
                  required: true,
               },
               home: {
                  required: true,
               },
               apartment: {
                  required: true,
               },
               index: {
                  required: true,
               },
               region: {
                  required: true,
               },
               town: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               street: {
                  required: "*",
               },
               home: {
                  required: "*",
               },
               apartment: {
                  required: "*",
               },
               index: {
                  required: "*",
               },
               region: {
                  required: "*",
               },
               town: {
                  required: "*",
               },
            },
         });
      }

      if (window.location.toString().indexOf("news-detail.html") > 0) {
         const swiperNews = new Swiper(".news-slider__block", {
            slidesPerView: 1,
            loop: true,
         });

         const maxItems = 5;
         const sliderNavItems = document.querySelectorAll(".news-slider__item");
         const sliderNav = document.querySelector(".news-slider__nav");

         sliderNavItems.forEach((el, index) => {
            el.setAttribute("data-index", index);

            el.addEventListener("click", (e) => {
               const index = parseInt(e.currentTarget.dataset.index);
               swiperNews.slideTo(index + 1);
            });
         });

         const showMore = () => {
            let childrenLength = sliderNav.children.length;

            if (childrenLength > maxItems) {
               document
                  .querySelectorAll(`.news-slider__item:nth-child(n+${maxItems + 1})`)
                  .forEach((el) => {
                     el.style.display = "none";
                  });
            }
         };
         showMore();

         const sliderPrev = document.querySelector(".news-slider__prev");
         const sliderNext = document.querySelector(".news-slider__next");

         sliderPrev.addEventListener("click", function () {
            swiperNews.slidePrev();
         });
         sliderNext.addEventListener("click", function () {
            swiperNews.slideNext();
         });

         //FORM VALIDATE
         $("#comments-form").validate({
            rules: {
               name: {
                  required: true,
               },
               comment: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               comment: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               ajaxFormSubmitComment();
            },
         });

         // Функция AJAX запрса на сервер

         function ajaxFormSubmitComment() {
            let string = $(".comments-form").serialize(); // Соханяем данные введенные в форму в строку.

            //Формируем ajax запрос
            $.ajax({
               type: "POST", // Тип запроса - POST
               url: "php/mail.php", // Куда отправляем запрос
               data: string, // Какие даные отправляем, в данном случае отправляем переменную string

               // Функция если все прошло успешно
               // success: function (html) {
               //    $(".comments-form").slideUp(1);
               //    $("#answer-comment").html(html);
               // },
            });
            // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
            return false;
         }

         const navSlider = new Swiper("#navSlider", {
            slidesPerView: 1,
            loop: true,
         });

         const commentSlider = new Swiper("#comments-slider", {
            slidesPerView: 1,
            loop: true,
         });

         const readMoreBtn = document.querySelectorAll("[data-read-more]");
         readMoreBtn.forEach((el) => {
            el.addEventListener("click", () => {
               const comment = el.previousElementSibling;

               if (el.innerText === "Читать полностью") {
                  el.innerText = "Скрыть";
                  comment.style.cssText = `-webkit-line-clamp: unset`;
               } else {
                  el.innerText = "Читать полностью";
                  comment.style.cssText = `-webkit-line-clamp: 5`;
               }
            });
         });
      }

      if (window.location.toString().indexOf("contacts.html") > 0) {
         const contactTel = document.querySelector("#contact-tel");

         intlTelInput(contactTel, {
            initialCountry: "auto",
            geoIpLookup: function (success, failure) {
               $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
                  let countryCode = resp && resp.country ? resp.country : "";
                  success(countryCode);
               });
            },
            // utilsScript: "../libs/intelinput/js/utils.js",
         });
         // contactTel.addEventListener("input", function () {
         //    const a = 7;

         //    console.log(+this.value);
         //    $("#contact-tel").mask(`+${a} (999) 99-99-999`);
         // });

         //FORM VALIDATE
         $("#contacts-form").validate({
            rules: {
               name: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               email: {
                  required: true,
               },
               comment: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               comment: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               ajaxFormSubmitAction();
            },
         });

         // Функция AJAX запрса на сервер

         function ajaxFormSubmitAction() {
            let string = $("#contacts-form").serialize(); // Соханяем данные введенные в форму в строку.

            //Формируем ajax запрос
            $.ajax({
               type: "POST", // Тип запроса - POST
               url: "php/mail.php", // Куда отправляем запрос
               data: string, // Какие даные отправляем, в данном случае отправляем переменную string

               // Функция если все прошло успешно
               success: function (html) {
                  $("#contacts-form").slideUp(1);
                  $("#answer-contacts").html(html);
               },
            });
            // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
            return false;
         }
      }

      if (window.location.toString().indexOf("returns.html") > 0) {
         const radioBtn = document.querySelectorAll(".radio-btn");
         radioBtn.forEach(function (item) {
            item.addEventListener("click", function () {
               radioBtn.forEach(function (item2) {
                  item2.classList.remove("active");
               });
               item.classList.add("active");
            });
         });

         const returnsTel = document.querySelector("#returns-tel");
         intlTelInput(returnsTel, {
            initialCountry: "auto",
            geoIpLookup: function (success, failure) {
               $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
                  let countryCode = resp && resp.country ? resp.country : "";
                  success(countryCode);
               });
            },
            // utilsScript: "../libs/intelinput/js/utils.js",
         });

         new AirDatepicker("#airdatepicker");

         const quantityCounter = document.querySelectorAll(".quantity-counter");
         quantityCounter.forEach(function (quantityCounter) {
            const quantityArrLeft = quantityCounter.querySelector(".quantity-counter__arrow--left");
            const quantityArrRight = quantityCounter.querySelector(
               ".quantity-counter__arrow--right"
            );

            quantityArrLeft.addEventListener("click", function () {
               const quantityNumVal =
                  +quantityCounter.querySelector(".quantity-counter__num").innerText;
               if (quantityNumVal > 1) {
                  const quantityNum = quantityCounter.querySelector(".quantity-counter__num");
                  quantityNum.innerText = quantityNumVal - 1;
               }
            });
            quantityArrRight.addEventListener("click", function () {
               const quantityNumVal =
                  +quantityCounter.querySelector(".quantity-counter__num").innerText;
               if (quantityNumVal >= 1) {
                  const quantityNum = quantityCounter.querySelector(".quantity-counter__num");
                  quantityNum.innerText = quantityNumVal + 1;
               }
            });
         });

         //FORM VALIDATE
         $("#returns-form").validate({
            rules: {
               name: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               email: {
                  required: true,
               },
               date: {
                  required: true,
               },
               numOrder: {
                  required: true,
               },
               naming: {
                  required: true,
               },
               model: {
                  required: true,
               },
               radioUnzip: {
                  required: true,
               },
               comment: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               date: {
                  required: "*",
               },
               numOrder: {
                  required: "*",
               },
               naming: {
                  required: "*",
               },
               model: {
                  required: "*",
               },
               radioUnzip: {
                  required: "*",
               },
               comment: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               ajaxFormSubmitReturns();
            },
         });

         // Функция AJAX запрса на сервер

         function ajaxFormSubmitReturns() {
            let string = $("#returns-form").serialize(); // Соханяем данные введенные в форму в строку.

            //Формируем ajax запрос
            $.ajax({
               type: "POST", // Тип запроса - POST
               url: "php/mail.php", // Куда отправляем запрос
               data: string, // Какие даные отправляем, в данном случае отправляем переменную string

               // Функция если все прошло успешно
               success: function (html) {
                  $("#returns-form").slideUp(1);
                  $("#returns-answer").html(html);
               },
            });
            // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
            return false;
         }
      }

      if (window.location.toString().indexOf("profile.html") > 0) {
         const orderingPayBtn = document.querySelectorAll(".ordering-pay__label");
         orderingPayBtn.forEach(function (item) {
            item.addEventListener("click", function () {
               orderingPayBtn.forEach(function (item2) {
                  item2.classList.remove("active");
               });
               item.classList.add("active");
            });
         });

         const orderingShipBtn = document.querySelectorAll(".ordering-shipping__label");
         orderingShipBtn.forEach(function (item) {
            item.addEventListener("click", function () {
               orderingShipBtn.forEach(function (item2) {
                  item2.classList.remove("active");
               });
               item.classList.add("active");
            });
         });

         const adressBox = document.querySelectorAll("[data-adress]");
         const addAdrssBtn = document.querySelectorAll("[data-add-adress]");
         const delAdressBtn = document.querySelectorAll("[data-del-adress]");
         const adressPopup = document.querySelector(".adress-popup");
         const adressPopupCross = document.querySelector(".adress-popup__cross");

         delAdressBtn.forEach(function (item) {
            item.addEventListener("click", function () {
               const parentAdress = item.parentNode;
               parentAdress.classList.add("none");
            });
         });

         addAdrssBtn.forEach(function (item) {
            item.addEventListener("click", function () {
               overlay.classList.add("active");
               adressPopup.classList.add("active");
            });
         });

         adressPopupCross.addEventListener("click", function () {
            overlay.classList.remove("active");
            adressPopup.classList.remove("active");
         });
         overlay.addEventListener("click", function () {
            overlay.classList.remove("active");
            adressPopup.classList.remove("active");
         });

         const changeInfoBtn = document.querySelectorAll("[data-change-personal]");
         const personalPopup = document.querySelector(".personal-popup");
         const personalPopupCross = document.querySelector(".personal-popup__cross");
         changeInfoBtn.forEach(function (item) {
            item.addEventListener("click", function () {
               overlay.classList.add("active");
               personalPopup.classList.add("active");
            });
         });
         personalPopupCross.addEventListener("click", function () {
            overlay.classList.remove("active");
            personalPopup.classList.remove("active");
         });
         overlay.addEventListener("click", function () {
            overlay.classList.remove("active");
            personalPopup.classList.remove("active");
         });

         const personalTel = document.querySelector("#personalTel");

         intlTelInput(personalTel, {
            initialCountry: "auto",
            geoIpLookup: function (success, failure) {
               $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
                  let countryCode = resp && resp.country ? resp.country : "";
                  success(countryCode);
               });
            },
            // utilsScript: "../libs/intelinput/js/utils.js",
         });

         //FORM VALIDATE
         $("#personalForm").validate({
            rules: {
               name: {
                  required: true,
               },
               email: {
                  required: true,
               },
               tel: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
            },
            submitHandler: function (form) {
               personalInfoSave();
            },
         });

         const subscrBtn = document.querySelectorAll("[data-subscribe-btn]");
         const subscribePopup = document.querySelector(".subscribe-popup");

         subscrBtn.forEach(function (item) {
            item.addEventListener("click", function () {
               overlay.classList.add("active");
               subscribePopup.classList.add("active");
            });
         });
         overlay.addEventListener("click", function () {
            overlay.classList.remove("active");
            subscribePopup.classList.remove("active");
         });
      }

      if (window.location.toString().indexOf("all-orders.html") > 0) {
         const orderTimeItem = document.querySelectorAll(".all-orders__time-item");
         orderTimeItem.forEach(function (item) {
            item.addEventListener("click", function () {
               orderTimeItem.forEach(function (item2) {
                  item2.classList.remove("active");
               });
               item.classList.toggle("active");
            });
         });

         const orderDropdown = document.querySelectorAll(".order-drop");
         orderDropdown.forEach(function (orderDropdown) {
            const orderdropBtn = orderDropdown.querySelector(".order-drop__btn");
            const orderdropItem = orderDropdown.querySelectorAll(".order-drop__item");
            orderdropBtn.addEventListener("click", function () {
               orderDropdown.classList.toggle("active");
            });

            orderdropItem.forEach(function (orderdropItem) {
               orderdropItem.addEventListener("click", function () {
                  const orderdropDate = orderDropdown.querySelector(".order-drop__date");
                  orderdropDate.innerText = orderdropItem.innerText;
                  orderDropdown.classList.remove("active");
               });
            });

            document.addEventListener("click", function (e) {
               if (e.target !== orderdropBtn) {
                  orderDropdown.classList.remove("active");
                  orderDropdown.classList.remove("active");
               }
            });

            document.addEventListener("keydown", function (e) {
               if (e.key === "Tab" || e.key === "Escape") {
                  orderDropdown.classList.remove("active");
                  orderDropdown.classList.remove("active");
               }
            });
         });
      }

      if (window.location.toString().indexOf("compare.html") > 0) {
         const radioBtn = document.querySelectorAll(".radio-btn");
         radioBtn.forEach(function (item) {
            item.addEventListener("click", function () {
               radioBtn.forEach(function (item2) {
                  item2.classList.remove("active");
               });
               item.classList.add("active");
            });
         });

         const mixItems = document.querySelectorAll(".compare__mix-item");
         mixItems.forEach(function (item) {
            item.addEventListener("click", function () {
               mixItems.forEach(function (items) {
                  items.classList.remove("active");
               });
               item.classList.add("active");
            });
         });

         let descrSwiper = new Swiper(".compareSwiperDescr", {
            slidesPerView: 1,
            spaceBetween: 20,
         });

         let swiper = new Swiper(".compareSwiper", {
            spaceBetween: 20,
            pagination: true,

            pagination: {
               el: ".swiper-pagination",
               type: "progressbar",
            },
            breakpoints: {
               0: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 10,
                  pagination: false,
               },
               319: {
                  spaceBetween: 16,
                  slidesPerView: 2,
                  slidesPerGroup: 2,
               },
               599: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
               },
               965: {
                  slidesPerView: 2,
               },
               1340: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
               },
            },
            thumbs: {
               swiper: descrSwiper,
            },
         });

         const swiperWrapperPag = document.querySelector(".swiper-wrapper__pag");
         const slideElems = swiperWrapperPag.querySelectorAll(".swiper-slide");
         const swiperPaginationHor = document.querySelector(
            ".swiper-pagination.swiper-pagination-progressbar.swiper-pagination-horizontal"
         );
         if (slideElems.length > 2) {
            swiperPaginationHor.classList.add("active");
         }

         let slides = document.querySelectorAll(".swiper-slide__mob");
         let totalSlidesCount = slides.length;
         slides.forEach(function (slide, i) {
            let currentSlide = slide.querySelector(".current-slide");
            let totalSlides = slide.querySelector(".total-slides");
            currentSlide.innerText = i + 1;
            totalSlides.innerText = totalSlidesCount;
         });

         let slidesDesc = document.querySelectorAll(".swiper-slide__desc");
         let slidesDescTotalCount = slidesDesc.length;
         slidesDesc.forEach(function (slide, i) {
            let currentSlide = slide.querySelector(".current-slide");
            let totalSlides = slide.querySelector(".total-slides");
            currentSlide.innerText = i + 1;
            totalSlides.innerText = slidesDescTotalCount;
         });

         const dropdown = document.querySelectorAll(".dropdown");
         dropdown.forEach(function (dropdown) {
            const dropBtn = dropdown.querySelector(".compare__drop");
            dropBtn.addEventListener("click", function () {
               dropdown.classList.toggle("active");
            });

            const dropItem = dropdown.querySelectorAll(".compare__drop-item");
            dropItem.forEach((dropItem) => {
               dropItem.addEventListener("click", () => {
                  dropBtn.innerText = dropItem.innerText;
                  dropdown.classList.remove("active");
               });
            });

            document.addEventListener("click", function (e) {
               if (e.target !== dropBtn) {
                  dropdown.classList.remove("active");
                  dropdown.classList.remove("active");
               }
            });

            document.addEventListener("keydown", function (e) {
               if (e.key === "Tab" || e.key === "Escape") {
                  dropdown.classList.remove("active");
                  dropdown.classList.remove("active");
               }
            });
         });
      }
   });
});
