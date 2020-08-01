import 'dart:async' show Future;
import 'package:flutter/services.dart' show rootBundle;
class JsonManager{

  Future<String> loadAsset() async {
    return await rootBundle.loadString('assets/config.json');
  }


}