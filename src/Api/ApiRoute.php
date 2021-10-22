<?php

namespace App\Api;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Annotation
 */
class ApiRoute extends Route
{
    /***
     * @return array|bool[]
     */
    public function getDefaults(): array
    {
        return array_merge(
            ['_is_api' =>true],
            parent::getDefaults()
        );
    }
}