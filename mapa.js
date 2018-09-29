var geocoder;
var map;
var marker;

function initialize() {
  //Setando posição do mapa
  var latlng = new google.maps.LatLng(-23.1862746, -50.6573834);
  var options = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  //Criando o mapa
  map = new google.maps.Map(document.getElementById("mapa"), options);

  //Retorna a latitude e a longitude de um endereço
  geocoder = new google.maps.Geocoder();

  //Criando o marcador
  marker = new google.maps.Marker({
    map: map
  });

  marker.setPosition(latlng);
}

$(document).ready(function() {
  initialize();

  function carregarNoMapa(endereco) {
    geocoder.geocode({ address: endereco + ", Brasil", region: "BR" }, function(
      results,
      status
    ) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();

          $("#endereco").attr("value", results[0].formatted_address);
          $("#latitude").attr("value", latitude);
          $("#longitude").attr("value", longitude);

          var nome = document.getElementById("nome").value;
          var moradia = document.getElementById("moradia");
          var moradiaSelecionada = moradia.options[moradia.selectedIndex].text;
          if (moradiaSelecionada == "República") {
            image = "images/rep3.png";
          } else if (moradiaSelecionada == "Apartamento") {
            image = "images/ap2.png";
          } else if (moradiaSelecionada == "Pensionato") {
            image = "images/pensionato4.png";
          } else if (moradiaSelecionada == "Kitnet") {
            image = "images/kitnet3.png";
          }
          marker = new google.maps.Marker({
            map: map,
            icon: image
          });

          var vagas = document.getElementById("vagas");
          var vagaSelecionada = vagas.options[vagas.selectedIndex].text;
          var vagas = document.getElementById("vagas");
          var vagaSelecionada = vagas.options[vagas.selectedIndex].text;
          var quarto = document.getElementById("quarto");
          var quartoSelecionado = quarto.options[quarto.selectedIndex].text;
          var mobilia = document.getElementById("mobilia");
          var mobiliaSelecionada = mobilia.options[mobilia.selectedIndex].text;
          var valor = document.getElementById("valor");
          var valorSelecionado = valor.options[valor.selectedIndex].text;
          var grupo = document.getElementById("grupo");
          var grupoSelecionado = grupo.options[grupo.selectedIndex].text;
          var endereco = document.getElementById("endereco").value;

          var iwContent =
            '<div id="iw_container">' +
            '<div class="iw_title">' +
            moradiaSelecionada +
            " " +
            nome +
            "<br /> Vagas: " +
            vagaSelecionada +
            "<br />Quarto: " +
            quartoSelecionado +
            "<br />Mobilia: " +
            mobiliaSelecionada +
            "<br />Valor: " +
            valorSelecionado +
            "<br />" +
            grupoSelecionado +
            "<br />Endereço: " +
            endereco +
            "</div></div>";

          var location = new google.maps.LatLng(latitude, longitude);

          marker.setPosition(location);
          map.setCenter(location);
          map.setZoom(16);

          var image;

          var infowindow = new google.maps.InfoWindow({
            content: iwContent
          });

          marker.addListener("click", function() {
            infowindow.open(map, marker);
          });
        }
      }
    });
  }

  $("#btnEndereco").click(function() {
    if ($(this).val() != "") carregarNoMapa($("#endereco").val());
  });

  $("#endereco").blur(function() {
    if ($(this).val() != "") carregarNoMapa($(this).val());
  });

  $("#endereco").autocomplete({
    source: function(request, response) {
      geocoder.geocode(
        { address: request.term + ", Brasil", region: "BR" },
        function(results, status) {
          response(
            $.map(results, function(item) {
              return {
                label: item.formatted_address,
                value: item.formatted_address,
                latitude: item.geometry.location.lat(),
                longitude: item.geometry.location.lng()
              };
            })
          );
        }
      );
    },
    select: function(event, ui) {
      $("#latitude").attr("value", ui.item.latitude);
      $("#longitude").attr("value", ui.item.longitude);
      var location = new google.maps.LatLng(
        ui.item.latitude,
        ui.item.longitude
      );
      newMarker();
    }
  });
});
