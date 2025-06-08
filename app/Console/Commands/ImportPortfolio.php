<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class ImportPortfolio extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-portfolio';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'import-portfolio is the command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // I would like to loop through all the entries in storage/app/portfolio.json and create .md files
        $filePath = storage_path('app/portfolio.json');

        if (!file_exists($filePath)) {
            $this->error('Portfolio file not found.');
            return 1; // Return a non-zero status code to indicate failure
        }

        $portfolioData = json_decode(file_get_contents($filePath), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->error('Invalid JSON format in portfolio file.');
            return 1; // Return a non-zero status code to indicate failure
        }

        foreach ($portfolioData['works'] as $entry) {
            if (isset($entry['title'], $entry['slug'])) {

                $exitraInfo = json_decode(file_get_contents(storage_path('app/portfolio/'.$entry['slug'].'.json')), true);

                $fileName = $entry['slug']. '.1.md';

                $fileContent = ""; // should use content/collections/portfolio/promservice_v2.md as template

                $fileContent .= "---\n";
                $fileContent .= "id: ".Str::uuid() . "\n";
                $fileContent .= "blueprint: portfolio". "\n";
                $fileContent .= "title: \"{$entry['title']}\"\n";
                $fileContent .= "footer_content: '".$exitraInfo['text_bottom']."'\n";
                $fileContent .= "screenshot: 'portfolio/".$entry['picture']. "'\n";
                $fileContent .= "feature: \"{$exitraInfo['feature']}\"\n";
                $fileContent .= "tech: \"{$exitraInfo['tech']}\"\n";
                $fileContent .= "thanks: \"{$exitraInfo['thanks']}\"\n";
                $fileContent .= "type: \"{$exitraInfo['type']}\"\n";
                $fileContent .= "clients_id: \"{$exitraInfo['clients_id']}\"\n";
                $fileContent .= "updated_by: 5a0bbf89-fd55-440f-ae32-47c9d13fd12e". "\n";
                $fileContent .= "updated_at: 1749339611". "\n";
                $fileContent .= "link_out: '".$entry['uri']. "'\n";
                $fileContent .= "date: \"{$entry['release_dt']}\"\n";
                $fileContent .= "---\n\n";
                $fileContent .= $exitraInfo['text_top'] . "\n";
                // content/collections/portfolio/promservice_v2.md
                $filePath = app_path("../content/collections/portfolio/{$fileName}");
                file_put_contents($filePath, $fileContent);

                $this->info("Created file: {$fileName}");
            } else {
                $this->error('Entry missing title or content.');
            }
        }

    }
}
