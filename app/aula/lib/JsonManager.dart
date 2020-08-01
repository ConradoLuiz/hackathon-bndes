import 'dart:async' show Future;
import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
class JsonManager{
  var conteudo;
  JsonManager();

  
 

  Future<Map> loadCountryData() async {
    try {
        
        final data = await rootBundle.loadString("assets/dados.json");
        this.conteudo=json.decode(data);
        return json.decode(data);
    } catch (e) {
      print(e);
    }
  }

}