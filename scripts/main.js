document.addEventListener('DOMContentLoaded', () => {

  const tabs = () => {
   const tabsButtonsParent = document.querySelector('.card-tabs__btn'),
         tabs = tabsButtonsParent.querySelectorAll('span'),
         contentWrapper = document.querySelector('.content-wrapper'),
         tabHeaders = contentWrapper.querySelectorAll('.content__header');

      tabsButtonsParent.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'SPAN') {
        tabs.forEach((elem, i) => {          
          if (elem === target) {
            elem.classList.toggle('tab-active');
            toggleTab(tabHeaders, 'header--active', i);
          } else {
            elem.classList.remove('tab-active');
          }
          
        });
      }
    });

    contentWrapper.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.content__header')) {

        tabHeaders.forEach((header, index) => {         
          if (header === target ) {
            header.classList.toggle('header--active');
            toggleTab(tabs, 'tab-active', index);
          } else {
            header.classList.remove('header--active');
          }          
        });
      }
    });

    function toggleTab(selector, activeClass ,i) {
      selector.forEach((header, index) => {
        if (i === index ) {
          header.classList.toggle(activeClass);
        } else {
          header.classList.remove(activeClass);
        }
      });
    }
  };

  const select = () => {
    const selectHeader = document.querySelector('.form__select-header'),
          realSelect = document.querySelector('#smth '),
          fakeSelect = document.querySelector('.form__select'),
          fakeSelectOptions =  document.querySelectorAll('.form__select-option'),
          smallGreyText = document.querySelector('.form__select-small'),
          fakeSelectHeight = fakeSelectOptions[0].clientHeight * fakeSelectOptions.length;

    let counter = 0;

    selectHeader.addEventListener('click', () => {
      if (!counter) {
        counter++;
        fakeSelect.classList.toggle('form__select--active');
        selectHeader.classList.add('header--active');

        fakeSelect.style.maxHeight = fakeSelectHeight + 'px';

        fakeSelect.addEventListener('click',chooseOption);
      } else {
        counter = 0;
        fakeSelect.classList.toggle('form__select--active');
        selectHeader.classList.remove('header--active');

        fakeSelect.style = '';

        fakeSelect.removeEventListener('click',chooseOption);
      }
      
    });

    const chooseOption = (e) => {
      fakeSelectOptions.forEach((elem, i) => {
        document.querySelector('.form__select-header').classList.remove('text--error');
        
        if (elem === e.target) {
          smallGreyText.classList.add('form__select-small--active');
          realSelect.selectedIndex = i + 1;
          selectHeader.textContent = elem.textContent;
          fakeSelect.classList.toggle('form__select--active');
          fakeSelect.style = '';
          document.removeEventListener('click',chooseOption);
          elem.classList.add('form__select-option--active');          
          counter = 0;
        } else {
          elem.classList.remove('form__select-option--active');
        }
      });
    };
  };

  const addFile = () => {
    document.getElementById('input-file').onchange = function () {
      const addFileText = document.querySelector('.file__addfile'),
            fileListContainer = document.querySelector('.add-file__right'),
            inputFile = document.getElementById('input-file');

           let allFiles = this.files,
              myArr = Array.from(allFiles);

      addFileText.style.display = 'none';
      

      for(let i = 0; i < allFiles.length; i++) {

        let fileNameDiv = document.createElement('div');
        fileNameDiv.classList.add('file__newfile');
        fileNameDiv.innerHTML = `
        ${allFiles[i].name}<span class="file__remove"><img src="images/remove-file.png" alt="remove file"></span>
        `;
        fileListContainer.append(fileNameDiv);
      }
      fileListContainer.addEventListener('click', fileRemover);

      function returnAddFileText() {
        if(fileListContainer.children[0] === undefined) {
          addFileText.removeAttribute('style');
          inputFile.value = '';
        }
      }
      
      function fileRemover(e) {
        const target = e.target;
        
        if(target.closest('.file__remove')) {
          target.closest('.file__newfile').remove();
          for(let i = 0; i < myArr.length; i++) {
            if (myArr[i].name === target.closest('.file__newfile').textContent.trim()) {
              myArr.splice(i, 1);
            }
          }
          returnAddFileText();
        }
      }
    };
   
  };

  const textArea = () => {
    const textarea = document.querySelector('.form__textarea'),
          greyTextTextarea = document.querySelector('.form__text-small');

    textarea.addEventListener('input', () => {
      console.log(textarea.value);
      if (textarea.value.trim()) {
        console.log(2);        
        greyTextTextarea.style.cssText = `
        opacity: 1;
        visibility: visible;
        `;        
      } else {
        console.log(3);
        greyTextTextarea.style = ``;
      }
    });
  };

  const form = () => {
    const form = document.querySelector('.form'),
          tel = form.querySelector('input[type="tel"]'),
          formSelect = document.querySelector('.form__select-header');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!tel.value.trim() ) {
        tel.classList.add('text--error');
      } else {
        tel.classList.remove('text--error');
      }

      if (document.getElementById('smth').selectedIndex === 0) {
        formSelect.classList.add('text--error');
      } else {
        formSelect.classList.remove('text--error');
      }
    });

    tel.addEventListener('input', () => {
      tel.value = tel.value.replace(/\D/, '');
      if (tel.value.trim()) {
        tel.classList.remove('text--error');
      }
    });
    
  };

  const cardMovementAnimation = () => {
    const container = document.querySelector('.card-interactive__wrapper'),
          column = document.querySelector('.column-2'),
          birdsLeft = document.querySelector('.birds-left'),
          birdsRight = document.querySelector('.birds-right');

    column.addEventListener('mousemove', (e) => {
      let xAxis = (e.pageX - (column.getBoundingClientRect().left + (column.clientWidth / 2))) / 20;     
      let yAxis = ( (column.offsetTop + (column.clientHeight / 2)) - e.pageY) / 15;     
      // let xAxis = (window.innerWidth / 2 - e.pageX) / 15;
      // let yAxis = (window.innerHeight / 2 - e.pageY) / 15;

      container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      birdsLeft.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(35px)`;
      birdsRight.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(-35px)`;
    });

    // Animate In
    column.addEventListener('mouseenter', (e) => {
        container.style.transition = '';       

    });
    // Animate Out
    column.addEventListener('mouseleave', (e) => {
      container.style.transition = 'all .5s ease';
      container.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });

  };

  const canvas = () => {
    let canVas = document.querySelector('.canvas');
    let scene, camera, renderer;

    function init() {

      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
      renderer.setClearColor( 0x000000, 0 );      
      renderer.setPixelRatio(window.devicePixelRatio); 
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.style.cssText = `
      width: 100%;
      object-fit: cover;`;
      canVas.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(10, window.innerWidth/window.innerHeight,1,5000);
      camera.position.x = 5;
      camera.position.y = 2;
      camera.position.z = 10;

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
  

    // const  ambient = new THREE.AmbientLight(0x404040,30);
    //   scene.add(ambient);
    //   console.log(ambient);

      directionalLight = new THREE.DirectionalLight(0xffffff,1);
      directionalLight.position.set(0,1,0);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

     
      light = new THREE.PointLight(0xc4c4c4,10);
      light.position.set(0,300,500);
      scene.add(light);

      light2 = new THREE.PointLight(0xc4c4c4,10);
      light2.position.set(0,300,-500);
      scene.add(light2);

      light3 = new THREE.PointLight(0xc4c4c4,10);
      light3.position.set(0,0,0);
      scene.add(light3);

    

      let loader = new THREE.GLTFLoader();
      loader.load('model/scene.gltf', function(gltf) {

       let face = gltf.scene.children[0];
        face.scale.set(.75,.75,.75);
        scene.add(gltf.scene);

        animate();
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);

    }
    init();
  };

  const phoneValidation = () => {
    const phoneInputs = document.querySelectorAll('input[name=phone]');
    phoneInputs.forEach((input) => {
      let keyCode;
  
      const mask = (event) => {
  
          event.keyCode && (keyCode = event.keyCode);
          let pos = input.selectionStart;
  
          if (pos < 3) {
              event.preventDefault();
          }
          let matrix = "+7 (___) ___-__-__",
              i = 0,
              def = matrix.replace(/\D/g, ""),
              val = input.value.replace(/\D/g, ""),
              newValue = matrix.replace(/[_\d]/g, (a) => {
                  if (i < val.length) {
                      return val.charAt(i++) || def.charAt(i);
                  } else {
                      return a;
                  }
              });
          i = newValue.indexOf("_");
  
          if (i != -1) {
              i < 5 && (i = 3);
              newValue = newValue.slice(0, i);
          }
  
          let reg = matrix.substr(0, input.value.length).replace(/_+/g,
              (a) => {
                  return "\\d{1," + a.length + "}";
              }).replace(/[+()]/g, "\\$&");
          reg = new RegExp("^" + reg + "$");
          if (!reg.test(input.value) || input.value.length < 5 || keyCode > 47 && keyCode < 58) {
              input.value = newValue;
          }
          if (event.type == "blur" && input.value.length < 5) {
              input.value = "";
          }
      };
  
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      // input.addEventListener("keydown", mask, false);
  
  });
  };


  phoneValidation();
  canvas();
  cardMovementAnimation();
  form();
  tabs();
  select();
  addFile();
  textArea();

  autosize(document.querySelectorAll('textarea'));
});
