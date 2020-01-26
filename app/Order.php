<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Order extends Model
{
    protected $table = 'orders';

    protected $fillable = [
      'phone', 'pizza', 'number', 'address', 'price_dollar', 'price_euro', 'date'
    ];

    public $timestamps = false;
}
